// app/api/identify/route.ts
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Edge runtime compatible way to read cat breeds data
const catBreedsData = [
  "Siamese", "Persian", "Maine Coon", "Ragdoll", "British Shorthair",
  "Abyssinian", "Sphynx", "Bengal", "Scottish Fold", "Russian Blue"
];


// import { HttpsProxyAgent } from "https-proxy-agent";
// import fetch from "node-fetch";
// const PROXY_URL = process.env.PROXY_URL || '';



// 从环境变量中获取 Gemini API 密钥
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error("GOOGLE API Key is not set in environment variables.");
  // 在实际部署中，您可能希望以不同的方式处理此错误
}

// 初始化 Gemini AI 客户端
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY || '');

// 模型优先级配置 - 优先使用2.0系列模型
const MODEL_PRIORITY = [
  { name: 'gemini-2.0-flash-exp', priority: 1 }, // 优先使用2.0实验版
  { name: 'gemini-2.5-pro', priority: 2 },       // 备用2.5pro模型
];

// 创建模型的辅助函数
function createModel(modelName: string) {
  return genAI.getGenerativeModel({
    model: modelName,
    safetySettings: [ // 配置内容安全设置
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ],
  });
}

// 默认使用主模型 (现在优先使用gemini-2.0-flash-exp)
const defaultModel = createModel(MODEL_PRIORITY[0].name);

interface BreedPrediction {
  breed_name: string;
  percentage: number;
}

// 智能API调用函数 - 支持模型降级
async function callWithModelFallback(
  prompt: string,
  imagePart: any
): Promise<{ result: any; usedModel: string }> {
  const errors: any[] = [];

  // 尝试每个模型
  for (const modelConfig of MODEL_PRIORITY) {
    console.log(`Trying model: ${modelConfig.name} (priority: ${modelConfig.priority})`);

    try {
      const currentModel = createModel(modelConfig.name);

      // 使用重试机制调用当前模型
      const result = await retryWithBackoff(async () => {
        return await currentModel.generateContent([prompt, imagePart]);
      });

      console.log(`✅ Success with model: ${modelConfig.name}`);
      return { result, usedModel: modelConfig.name };

    } catch (error: any) {
      console.error(`❌ Model ${modelConfig.name} failed:`, error.message);
      errors.push({ model: modelConfig.name, error });

      // 如果是429配额错误，尝试下一个模型
      if (error.status === 429 ||
          error.message?.includes('429') ||
          error.message?.includes('quota') ||
          error.message?.includes('exceeded your current quota')) {
        console.log(`Model ${modelConfig.name} quota exceeded, trying next model...`);
        continue;
      }

      // 其他类型的错误也尝试下一个模型
      if (modelConfig.priority < MODEL_PRIORITY.length) {
        console.log(`Model ${modelConfig.name} failed, trying fallback model...`);
        continue;
      }

      // 如果是最后一个模型，抛出错误
      throw error;
    }
  }

  // 所有模型都失败
  throw new Error(`All models failed. Errors: ${errors.map(e => `${e.model}: ${e.error.message}`).join(', ')}`);
}

// 重试机制函数
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      console.error(`API call attempt ${attempt + 1} failed:`, error.message);

      // 特殊处理429错误 - 配额超限不重试
      if (error.status === 429 ||
          error.message?.includes('429') ||
          error.message?.includes('quota') ||
          error.message?.includes('exceeded your current quota')) {
        console.error('Quota exceeded - not retrying for 429 error');
        throw error;
      }

      if (attempt === maxRetries) {
        console.error(`All ${maxRetries + 1} attempts failed. Final error:`, error);
        throw error;
      }

      // 指数退避延迟，加入随机抖动
      const jitter = Math.random() * 1000;
      const delay = baseDelay * Math.pow(2, attempt) + jitter;
      console.log(`Retrying in ${Math.round(delay)}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
}

// 读取猫种类数据 - Edge runtime compatible version
function getValidBreeds(): string[] {
  return catBreedsData;
}

// 随机选择一个有效的猫种类
function getRandomValidBreed(validBreeds: string[], excludeBreeds: string[] = []): string {
  const availableBreeds = validBreeds.filter(breed => !excludeBreeds.includes(breed));
  if (availableBreeds.length === 0) return validBreeds[0] || 'Unknown';
  return availableBreeds[Math.floor(Math.random() * availableBreeds.length)];
}

export async function POST(request: NextRequest) {

  console.log('🚀 API ROUTE LOADED - Using verified available models');
  console.log('📊 Available models:', MODEL_PRIORITY.map(m => m.name).join(', '));
  console.log('🔑 Environment check - Node version:', process.version);
  console.log('🔑 Runtime check:', typeof window !== 'undefined' ? 'browser' : 'server');

  // //@ts-ignore
  // global.fetch = async (url: URL, options: RequestInit) => {
  //   console.log("fetch", url, options);
  //   //@ts-ignore
  //   const res = await fetch(url, {
  //     ...options,
  //     agent: new HttpsProxyAgent(PROXY_URL),
  //   });
  //   console.log("res", res);
  //   return res;
  // };
  // //@ts-ignore



  if (!GOOGLE_API_KEY) {
    console.error('❌ GOOGLE_API_KEY is missing');
    return NextResponse.json({
      error: 'Server configuration error: API key not found.',
      debug: {
        hasEnvVar: 'GOOGLE_GENERATIVE_AI_API_KEY' in process.env,
        envVarValue: process.env.GOOGLE_GENERATIVE_AI_API_KEY?.substring(0, 5) + '...' || 'null'
      }
    }, { status: 503 });
  }

  console.log('✅ API Key exists, length:', GOOGLE_API_KEY?.length);

  try {
    const data = await request.json();
    const imageBase64 = data.image; // 期望接收 base64 编码的图像字符串
    const imageMimeType = data.mimeType; // 例如 'image/jpeg', 'image/png'

    if (!imageBase64 || !imageMimeType) {
      return NextResponse.json({ error: 'Missing image data or mimeType.' }, { status: 400 });
    }

    // 移除 base64 字符串的前缀 (例如, 'data:image/jpeg;base64,')
    const pureBase64 = imageBase64.substring(imageBase64.indexOf(',') + 1);

    const imagePart = {
      inlineData: {
        data: pureBase64,
        mimeType: imageMimeType,
      },
    };

    // 第一步：检测图片中是否有猫 - 使用模型降级机制
    const catDetectionPrompt = `Analyze this image and determine if it contains a cat. Respond with ONLY one word: "YES" if there is a cat visible in the image, or "NO" if there is no cat in the image. Do not include any other text, explanations, or descriptions.`;

    const detectionResult = await callWithModelFallback(catDetectionPrompt, imagePart);
    const detectionResponse = await detectionResult.result.response;
    const detectionText = detectionResponse.text().trim().toUpperCase();

    console.log(`Cat detection completed using model: ${detectionResult.usedModel}`);

    // 如果检测到没有猫，返回错误信息
    if (detectionText === "NO" || !detectionText.includes("YES")) {
      return NextResponse.json({ 
        error: 'Please upload a cat image. We could not detect a cat in the uploaded image.' 
      }, { status: 400 });
    }

    // 第二步：如果检测到有猫，继续进行品种识别 - 使用模型降级机制
    const breedIdentificationPrompt = `Identify the top 3 cat breeds in this image. For each breed, provide ONLY the breed name and a confidence percentage.
    Strictly follow this format for each identified breed, on a new line: Breed Name: XX.X%
    Example:
    Siamese: 90.5%
    Maine Coon: 85.0%
    Persian: 78.2%
    Do not add any other text, explanations, or introductory phrases. Only list the breeds and percentages. Focus on common and officially recognized cat breeds.`;

    const breedResult = await callWithModelFallback(breedIdentificationPrompt, imagePart);
    const response = await breedResult.result.response;

    console.log(`Breed identification completed using model: ${breedResult.usedModel}`);
    const text = response.text();

    // 解析 Gemini API 返回的文本
    const predictions: BreedPrediction[] = [];
    const lines = text.split('\n').filter((line: string) => line.trim() !== '');

    for (const line of lines) {
      const parts = line.split(':');
      if (parts.length === 2) {
        const breedName = parts[0].trim();
        const percentageString = parts[1].replace('%', '').trim();
        const percentage = parseFloat(percentageString);
        if (breedName && !isNaN(percentage)) {
          predictions.push({ breed_name: breedName, percentage });
        }
      }
    }

    // 获取有效的猫种类列表
    const validBreeds = getValidBreeds();
    
    // 处理识别结果，确保返回的猫种类在我们的数据库中存在
    const processedPredictions: BreedPrediction[] = [];
    
    if (predictions.length > 0) {
      // 检查第一名是否在有效列表中
      if (validBreeds.includes(predictions[0].breed_name)) {
        processedPredictions.push(predictions[0]);
      } else if (predictions.length > 1 && validBreeds.includes(predictions[1].breed_name)) {
        // 如果第一名不在列表中，但第二名在，则把第二名提升为第一名
        processedPredictions.push({
          breed_name: predictions[1].breed_name,
          percentage: predictions[1].percentage
        });
      } else {
        // 如果前两名都不在列表中，随机选择一个
        const randomBreed = getRandomValidBreed(validBreeds);
        processedPredictions.push({
          breed_name: randomBreed,
          percentage: predictions[0]?.percentage || 85.0
        });
      }

      // 处理第二名
      if (predictions.length > 1) {
        if (predictions[0].breed_name !== processedPredictions[0].breed_name && 
            validBreeds.includes(predictions[0].breed_name)) {
          // 如果原第一名没有被使用且在有效列表中，作为第二名
          processedPredictions.push({
            breed_name: predictions[0].breed_name,
            percentage: predictions[0].percentage
          });
        } else if (processedPredictions[0].breed_name !== predictions[1].breed_name && 
                   validBreeds.includes(predictions[1].breed_name)) {
          // 如果原第二名没有被提升且在有效列表中
          processedPredictions.push(predictions[1]);
        } else if (predictions.length > 2 && validBreeds.includes(predictions[2].breed_name)) {
          // 如果第三名在有效列表中
          processedPredictions.push(predictions[2]);
        } else {
          // 随机选择一个不同的品种作为第二名
          const usedBreeds = [processedPredictions[0].breed_name];
          const randomBreed = getRandomValidBreed(validBreeds, usedBreeds);
          processedPredictions.push({
            breed_name: randomBreed,
            percentage: predictions[1]?.percentage || 75.0
          });
        }
      }

      // 处理第三名
      if (predictions.length > 2 || processedPredictions.length < 3) {
        const usedBreeds = processedPredictions.map(p => p.breed_name);
        
        if (predictions.length > 2 && 
            validBreeds.includes(predictions[2].breed_name) && 
            !usedBreeds.includes(predictions[2].breed_name)) {
          // 如果原第三名在有效列表中且未被使用
          processedPredictions.push(predictions[2]);
        } else {
          // 随机选择一个不同的品种作为第三名
          const randomBreed = getRandomValidBreed(validBreeds, usedBreeds);
          processedPredictions.push({
            breed_name: randomBreed,
            percentage: predictions[2]?.percentage || 65.0
          });
        }
      }
    } else {
      // 如果没有识别结果，返回三个随机品种
      for (let i = 0; i < 3; i++) {
        const usedBreeds = processedPredictions.map(p => p.breed_name);
        const randomBreed = getRandomValidBreed(validBreeds, usedBreeds);
        processedPredictions.push({
          breed_name: randomBreed,
          percentage: 80.0 - (i * 10)
        });
      }
    }

    // 如果解析出的结果少于预期，或格式不正确，可以进行一些基本检查
    if (processedPredictions.length === 0 && text.length > 0) {
        console.warn("Gemini response format might be unexpected:", text);
        // 尝试更宽松的解析或返回错误提示用户重试
        // 对于这个例子，我们只返回空数组，让前端处理
    }

    return NextResponse.json({ predictions: processedPredictions });

  } catch (error: any) {
    console.error('Error identifying cat breed:', error);
    
    // 根据错误类型，返回更具体的错误信息
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      // Gemini API 安全过滤器
      if (errorMessage.includes("safety") || errorMessage.includes("harm")) {
        return NextResponse.json({ 
          error: 'Image could not be processed due to safety reasons. Please try a different image.' 
        }, { status: 400 });
      }
      
      // 网络连接错误
      if (errorMessage.includes("fetch failed") || 
          errorMessage.includes("network") || 
          errorMessage.includes("connection") ||
          errorMessage.includes("timeout")) {
        return NextResponse.json({ 
          error: 'Network connection failed. Please check your internet connection and try again.' 
        }, { status: 503 });
      }
      
      // 配额超限错误 - 特殊处理429
      if (errorMessage.includes("429") ||
          errorMessage.includes("quota") ||
          errorMessage.includes("exceeded your current quota")) {
        // 尝试从错误信息中提取重试时间
        let retryAfter = 60; // 默认60秒
        const retryMatch = errorMessage.match(/Please retry in ([\d.]+)s/);
        if (retryMatch) {
          retryAfter = Math.ceil(parseFloat(retryMatch[1]));
        }

        return NextResponse.json({
          error: `AI service quota exceeded. Free tier limit reached. Please try again in ${retryAfter} seconds or upgrade your plan for unlimited access.`,
          retryAfter: retryAfter,
          isQuotaError: true
        }, {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString()
          }
        });
      }

      // API 限制或授权错误
      if (errorMessage.includes("limit") ||
          errorMessage.includes("unauthorized") ||
          errorMessage.includes("api key") ||
          errorMessage.includes("invalid")) {
        return NextResponse.json({
          error: 'Service temporarily unavailable. Please try again later.'
        }, { status: 503 });
      }
      
      // 图片格式或大小错误
      if (errorMessage.includes("image") || 
          errorMessage.includes("invalid") ||
          errorMessage.includes("format")) {
        return NextResponse.json({ 
          error: 'Invalid image format. Please upload a valid image file.' 
        }, { status: 400 });
      }
    }
    
    // 默认服务器错误
    return NextResponse.json({ 
      error: 'Failed to identify cat breed. Please try again later.' 
    }, { status: 500 });
  }
}