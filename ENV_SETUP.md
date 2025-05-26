# 环境变量设置说明

## 必需的环境变量

为了使用AI功能，你需要设置Google AI API密钥。

### 1. 获取Google AI API密钥

1. 访问 [Google AI Studio](https://ai.google.dev/)
2. 登录你的Google账户
3. 创建新的API密钥
4. 复制API密钥

### 2. 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```bash
# 在项目根目录运行
touch .env.local
```

### 3. 添加API密钥和代理配置

在 `.env.local` 文件中添加以下内容：

```
# Google Gemini AI API 密钥 (必需)
GEMINI_API_KEY=your_actual_api_key_here

# 代理服务器配置 (可选)
# 如果你需要通过代理访问Google AI API，请设置以下变量
# 格式: http://[username:password@]proxy-server:port
PROXY_URL=http://127.0.0.1:7890
```

### 4. 代理配置详细说明

#### 常见代理配置示例：

```bash
# 本地代理 (Clash、V2Ray、Shadowsocks等)
PROXY_URL=http://127.0.0.1:7890

# 带用户名密码的代理
PROXY_URL=http://username:password@proxy.example.com:8080

# 公司代理
PROXY_URL=http://proxy.company.com:8080

# 不同端口的本地代理
PROXY_URL=http://127.0.0.1:1087
```

#### 如何找到你的代理端口：

1. **Clash**: 通常是 `http://127.0.0.1:7890`
2. **V2Ray**: 通常是 `http://127.0.0.1:1087` 或 `http://127.0.0.1:8080`
3. **Shadowsocks**: 通常是 `http://127.0.0.1:1087`
4. **系统代理**: 查看系统网络设置中的HTTP代理配置

#### 代理功能说明：

- ✅ 自动检测是否设置了代理URL
- ✅ 只对外部API请求使用代理
- ✅ 本地请求不经过代理
- ✅ 代理失败时自动回退到直连
- ✅ 详细的日志输出便于调试

**重要提醒：**
- 将 `your_actual_api_key_here` 替换为你的真实API密钥
- 如果不需要代理，可以不设置 `PROXY_URL` 变量
- 不要将 `.env.local` 文件提交到git仓库
- API密钥应该保密，不要分享给他人

### 5. 重启开发服务器

设置完环境变量后，重启开发服务器：

```bash
npm run dev
```

现在你的猫品种识别应用就可以正常工作了！

### 6. 测试代理配置

启动应用后，查看控制台输出：
- 如果看到 "设置全局代理: http://..." 说明代理配置成功
- 如果看到 "未设置代理URL，使用默认网络连接" 说明使用直连
- API请求时会显示 "代理请求成功" 或相关错误信息 