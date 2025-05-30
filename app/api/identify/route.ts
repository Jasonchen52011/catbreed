// app/api/identify/route.ts
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';


import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";
const PROXY_URL = process.env.PROXY_URL || '';



// 从环境变量中获取 Gemini API 密钥
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("Gemini API Key is not set in environment variables.");
  // 在实际部署中，您可能希望以不同的方式处理此错误
}

// 初始化 Gemini AI 客户端
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || '');


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

export async function POST(request: NextRequest) {



  //@ts-ignore
  global.fetch = async (url: URL, options: RequestInit) => {
    console.log("fetch", url, options);
    //@ts-ignore
    const res = await fetch(url, {
      ...options,
      agent: new HttpsProxyAgent(PROXY_URL),
    });
    console.log("res", res);
    return res;
  };
  //@ts-ignore

  

  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'API key not configured.' }, { status: 500 });
  }

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

    // 给 Gemini API 的提示
    const prompt = `Identify the top 3 cat breeds in this image. For each breed, provide ONLY the breed name and a confidence percentage.
    Strictly follow this format for each identified breed, on a new line: Breed Name: XX.X%
    Example:
    Siamese: 90.5%
    Maine Coon: 85.0%
    Persian: 78.2%
    Do not add any other text, explanations, or introductory phrases. Only list the breeds and percentages. Focus on common and officially recognized cat breeds.`;

    const result = await model.generateContent([prompt, imagePart]);
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

    // 如果解析出的结果少于预期，或格式不正确，可以进行一些基本检查
    if (predictions.length === 0 && text.length > 0) {
        console.warn("Gemini response format might be unexpected:", text);
        // 尝试更宽松的解析或返回错误提示用户重试
        // 对于这个例子，我们只返回空数组，让前端处理
    }


    return NextResponse.json({ predictions });

  } catch (error) {
    console.error('Error identifying cat breed:', error);
    // 根据错误类型，可以返回更具体的错误信息
    if (error instanceof Error) {
        if (error.message.includes("SAFETY")) {
             return NextResponse.json({ error: 'Image could not be processed due to safety reasons. Try a different image.' }, { status: 400 });
        }
    }
    return NextResponse.json({ error: 'Failed to identify cat breed.' }, { status: 500 });
  }
}