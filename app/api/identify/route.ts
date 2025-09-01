// app/api/identify/route.ts
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';


// import { HttpsProxyAgent } from "https-proxy-agent";
// import fetch from "node-fetch";
// const PROXY_URL = process.env.PROXY_URL || '';



// 从环境变量中获取 Gemini API 密钥
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error("GOOGLE API Key is not set in environment variables.");
  // 在实际部署中，您可能希望以不同的方式处理此错误
}

// 初始化 Gemini AI 客户端
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY || '');


const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash', 
  safetySettings: [ // 配置内容安全设置
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ],
});

interface BreedPrediction {
  breed_name: string;
  percentage: number;
}

// 重试机制函数
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 4,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      console.error(`API call attempt ${attempt + 1} failed:`, error.message);
      
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

// 读取猫种类数据
function getValidBreeds(): string[] {
  try {
    const catDataPath = path.join(process.cwd(), 'public', 'cat.json');
    const catData = JSON.parse(fs.readFileSync(catDataPath, 'utf8'));
    return catData.map((cat: any) => cat.breed_name);
  } catch (error) {
    console.error('Error reading cat breeds data:', error);
    return [];
  }
}

// 随机选择一个有效的猫种类
function getRandomValidBreed(validBreeds: string[], excludeBreeds: string[] = []): string {
  const availableBreeds = validBreeds.filter(breed => !excludeBreeds.includes(breed));
  if (availableBreeds.length === 0) return validBreeds[0] || 'Unknown';
  return availableBreeds[Math.floor(Math.random() * availableBreeds.length)];
}

export async function POST(request: NextRequest) {



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
    console.error('GOOGLE_API_KEY is missing:', GOOGLE_API_KEY);
    return NextResponse.json({ error: 'Server configuration error: API key not found.' }, { status: 500 });
  }

  console.log('API Key exists:', !!GOOGLE_API_KEY, 'Key length:', GOOGLE_API_KEY?.length);

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

    // 第一步：检测图片中是否有猫 - 使用重试机制
    const catDetectionPrompt = `Analyze this image and determine if it contains a cat. Respond with ONLY one word: "YES" if there is a cat visible in the image, or "NO" if there is no cat in the image. Do not include any other text, explanations, or descriptions.`;

    const detectionResult = await retryWithBackoff(async () => {
      return await model.generateContent([catDetectionPrompt, imagePart]);
    });
    const detectionResponse = await detectionResult.response;
    const detectionText = detectionResponse.text().trim().toUpperCase();

    // 如果检测到没有猫，返回错误信息
    if (detectionText === "NO" || !detectionText.includes("YES")) {
      return NextResponse.json({ 
        error: 'Please upload a cat image. We could not detect a cat in the uploaded image.' 
      }, { status: 400 });
    }

    // 第二步：如果检测到有猫，继续进行品种识别 - 使用重试机制
    const breedIdentificationPrompt = `Identify the top 3 cat breeds in this image. For each breed, provide ONLY the breed name and a confidence percentage.
    Strictly follow this format for each identified breed, on a new line: Breed Name: XX.X%
    Example:
    Siamese: 90.5%
    Maine Coon: 85.0%
    Persian: 78.2%
    Do not add any other text, explanations, or introductory phrases. Only list the breeds and percentages. Focus on common and officially recognized cat breeds.`;

    const result = await retryWithBackoff(async () => {
      return await model.generateContent([breedIdentificationPrompt, imagePart]);
    });
    const response = await result.response;
    const text = response.text();

    // 解析 Gemini API 返回的文本
    const predictions: BreedPrediction[] = [];
    const lines = text.split('\n').filter(line => line.trim() !== '');

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
      
      // API 限制或授权错误
      if (errorMessage.includes("quota") || 
          errorMessage.includes("limit") || 
          errorMessage.includes("unauthorized") ||
          errorMessage.includes("api key")) {
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