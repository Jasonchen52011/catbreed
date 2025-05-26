// 测试代理配置脚本
// 运行: node scripts/test-proxy.js

// 导入代理配置
require('../lib/proxy-setup.ts');

async function testProxy() {
  console.log('🧪 开始测试代理配置...\n');

  // 测试1: 检查环境变量
  const proxyUrl = process.env.PROXY_URL;
  console.log('📋 环境变量检查:');
  console.log(`   PROXY_URL: ${proxyUrl || '未设置'}`);
  console.log(`   GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '已设置' : '未设置'}\n`);

  // 测试2: 测试外部API请求
  console.log('🌐 测试外部API请求...');
  try {
    const response = await fetch('https://httpbin.org/ip');
    const data = await response.json();
    console.log('✅ 外部API请求成功');
    console.log(`   返回IP: ${data.origin}\n`);
  } catch (error) {
    console.error('❌ 外部API请求失败:', error.message);
  }

  // 测试3: 测试Google AI API连接
  if (process.env.GEMINI_API_KEY) {
    console.log('🤖 测试Google AI API连接...');
    try {
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const result = await model.generateContent('Hello, this is a test.');
      console.log('✅ Google AI API连接成功');
      console.log(`   响应: ${result.response.text().substring(0, 50)}...\n`);
    } catch (error) {
      console.error('❌ Google AI API连接失败:', error.message);
    }
  } else {
    console.log('⚠️  跳过Google AI API测试 (未设置API密钥)\n');
  }

  console.log('🎉 代理配置测试完成!');
}

// 运行测试
testProxy().catch(console.error); 