// 简单的部署测试端点
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    return NextResponse.json({
      status: 'success',
      message: 'Deployment test successful',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      hasApiKey: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      apiKeyLength: process.env.GOOGLE_GENERATIVE_AI_API_KEY?.length || 0
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Deployment test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}