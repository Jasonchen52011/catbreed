// app/api/cat-translator-online/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, GenerationConfig } from '@google/generative-ai';

import { HttpsProxyAgent } from "https-proxy-agent";
import nodefetch from "node-fetch";
const PROXY_URL = process.env.PROXY_URL || '';


// 从环境变量中获取API密钥
const API_KEY = process.env.GOOGLE_API_KEY;

// 确保API密钥已设置
if (!API_KEY) {
  console.error("Missing GOOGLE_API_KEY environment variable."); 
}

// 初始化Gemini客户端
const genAI = new GoogleGenerativeAI(API_KEY || "");

export async function POST(request: NextRequest) {

  // // 如果设置了代理，使用代理
  // if (PROXY_URL) {
  //   console.log("Proxy URL configured:", PROXY_URL);
  //   //@ts-ignore
  //   global.fetch = async (url: URL, options: RequestInit) => {
  //     console.log("Using proxy for fetch:", PROXY_URL);
  //     console.log("Fetching URL:", url.toString());
  //     //@ts-ignore
  //     const res = await nodefetch(url, {
  //       ...options,
  //       agent: new HttpsProxyAgent(PROXY_URL),
  //     });
  //     console.log("Response status:", res.status);
  //     return res;
  //   };
  // } else {
  //   console.log("No proxy configured, using direct connection");
  // }



  if (!API_KEY) {
    return NextResponse.json({ error: 'Server configuration error: API key not found.' }, { status: 500 }); // 服务器配置错误：未找到API密钥。
  }

  try {
    const body = await request.json();
    const humanText = body.text;

    if (!humanText || typeof humanText !== 'string' || humanText.trim() === "") {
      return NextResponse.json({ error: 'Input text is required and must be a non-empty string.' }, { status: 400 }); // 需要输入文本，且必须为非空字符串。
    }

    // 尝试使用的模型列表，优先使用 2.0，如果失败则切换到 2.5
    const models = ["gemini-2.0-flash", "gemini-2.5-flash"];
    let lastError: any = null;
    
    // 精心设计的提示，引导AI将情感分类为 "happy", "sad", "angry", 或 "normal"
    const prompt = `You are an emotion classification AI. Analyze the human text and classify the dominant emotion into one of the following exact categories: "happy", "sad", "angry", "normal".
- If the text expresses clear joy, excitement, or contentment, classify as "happy".
- If the text expresses clear sadness, disappointment, or grief, classify as "sad".
- If the text expresses clear anger, frustration, or aggression, classify as "angry".
- For any other emotion (like confusion, curiosity, fear, surprise, or a neutral statement), or if the emotion is mixed or unclear, classify as "normal".

Human text: "${humanText}"

Respond with a JSON object containing a single key "emotion" with the value being one of the four lowercase emotion strings. For example: {"emotion": "happy"}`;

    // 尝试每个模型
    for (const modelName of models) {
      try {
        console.log(`Attempting to use model: ${modelName}`);
        
        const model = genAI.getGenerativeModel({
          model: modelName,
          safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          ],
          // 配置模型以输出JSON对象
          generationConfig: {
            responseMimeType: "application/json",
          } as GenerationConfig,
        });

        const result = await model.generateContent(prompt);
        const response = result.response;
        const responseText = response.text();
        
        console.log(`Successfully used model: ${modelName}`);

        // 解析AI返回的JSON字符串
        let parsedEmotion;
        try {
            parsedEmotion = JSON.parse(responseText);
            if (!parsedEmotion.emotion || !['happy', 'sad', 'angry', 'normal'].includes(parsedEmotion.emotion)) {
                console.warn("AI returned unexpected JSON structure or emotion value:", responseText);
                parsedEmotion = { emotion: "normal" };
            }
        } catch (e) {
            console.error('Failed to parse JSON response from AI:', responseText, e);
            parsedEmotion = { emotion: "normal" };
        }

        return NextResponse.json(parsedEmotion); // 成功返回结果
        
      } catch (error: any) {
        lastError = error;
        console.error(`Failed with model ${modelName}:`, error.message);
        
        // 如果是 429 错误且还有其他模型可以尝试，继续下一个
        if (error.message && error.message.includes('429') && modelName !== models[models.length - 1]) {
          console.log(`Model ${modelName} hit quota limit, trying next model...`);
          continue;
        }
        
        // 如果不是 429 错误或者是最后一个模型，直接抛出错误
        throw error;
      }
    }
    
    // 如果所有模型都失败了，抛出最后的错误
    throw lastError || new Error('All models failed');

  } catch (error: any) {
    console.error('Error in cat translator API:', error); // Cat Translator API 出错：
    let errorMessage = 'Failed to classify emotion for kitty talk.'; // 为猫咪对话分类情感失败。
    let statusCode = 500;
    
    if (error.message && typeof error.message === 'string') {
        if (error.message.includes('429') || error.message.includes('quota')) {
            errorMessage = 'Our cat translator is taking a rest (daily limit reached). Please try again tomorrow! 🐱'; // 我们的猫咪翻译器正在休息（已达每日限制）。请明天再试！
            statusCode = 429;
        } else if (error.message.includes('safety settings') || (error.toString && error.toString().includes('SAFETY'))) {
            errorMessage = 'The input was blocked due to safety settings. Please try different wording.'; // 由于安全设置，输入被阻止。请尝试不同的措辞。
        } else if (error.message.includes(' candidats.length is 0')) {
             errorMessage = 'The AI could not generate a response, this might be due to the input or safety filters. Please try again with different text.'; // AI无法生成回应，可能是由于输入或安全过滤器。请用不同文本重试。
        }
    }
    
    // 对于配额错误，返回一个随机的默认情感来保持用户体验
    const defaultEmotions = ["happy", "normal", "happy", "normal"];
    const randomEmotion = defaultEmotions[Math.floor(Math.random() * defaultEmotions.length)];
    
    return NextResponse.json({ 
      error: errorMessage, 
      emotion: randomEmotion,
      isQuotaError: statusCode === 429 
    }, { status: statusCode }); // 即使出错也返回一个默认情感，前端可以处理
  }
}