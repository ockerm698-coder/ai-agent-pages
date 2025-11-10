# AI Agent Pages

> 基于 React + TypeScript 的 AI 聊天助手前端应用

AI Agent Pages 是一个现代化的 Web 聊天界面，通过 GraphQL API 与后端 AI 服务（ai-agent-works）通信，为用户提供流畅的 AI 对话体验。

## ✨ 功能特性

- 💬 **实时对话**：与 AI 助手进行自然流畅的对话交互
- 📝 **消息历史**：保持对话上下文，支持多轮对话
- 🎨 **现代 UI**：简洁美观的聊天界面设计
- ⚡ **快速响应**：基于 Vite 构建，开发和生产环境都极速
- 🔌 **API 集成**：通过 GraphQL 与后端 AI 服务无缝对接
- 📱 **响应式设计**：适配各种屏幕尺寸
- ⌨️ **键盘快捷键**：支持 Enter 发送、Shift+Enter 换行
- 🚀 **错误处理**：完善的错误提示和异常处理机制

## 🛠️ 技术栈

- **框架**：React 18.2
- **语言**：TypeScript 5.2
- **构建工具**：Vite 5.0
- **样式**：CSS Modules
- **API 通信**：GraphQL (Fetch API)
- **状态管理**：React Hooks (useState, useEffect)

## 📁 项目结构

```
ai-agent-pages/
├── src/
│   ├── components/          # React 组件
│   │   ├── ChatBox.tsx     # 主聊天容器组件
│   │   ├── MessageList.tsx # 消息列表组件
│   │   ├── MessageInput.tsx# 消息输入组件
│   │   └── *.css           # 组件样式
│   ├── services/           # API 服务
│   │   └── chatApi.ts      # GraphQL API 调用封装
│   ├── types/              # TypeScript 类型定义
│   │   └── message.ts      # 消息类型
│   ├── App.tsx             # 应用根组件
│   ├── main.tsx            # 应用入口
│   ├── vite-env.d.ts       # Vite 环境变量类型
│   └── *.css               # 全局样式
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
├── .env.example            # 环境变量示例
└── README.md               # 项目文档

```

## 🚀 快速开始

### 前置要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
# 进入项目目录
cd ai-agent-pages

# 安装依赖
npm install
```

### 配置环境变量

```bash
# 复制环境变量示例文件
cp .env.example .env

# 编辑 .env 文件，配置 API 端点
# VITE_API_ENDPOINT=http://localhost:8787/graphql
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录

### 预览生产版本

```bash
npm run preview
```

## ⚙️ 配置说明

### 环境变量

在项目根目录创建 `.env` 文件：

```env
# GraphQL API 端点地址
VITE_API_ENDPOINT=http://localhost:8787/graphql

# 如果使用已部署的服务，可以配置为：
# VITE_API_ENDPOINT=https://your-worker.your-subdomain.workers.dev/graphql
```

**注意**：
- 所有环境变量必须以 `VITE_` 开头才能被 Vite 识别
- 修改环境变量后需要重启开发服务器

## 💡 使用说明

### 基本使用

1. 启动后端 API 服务（ai-agent-works）
2. 启动前端开发服务器
3. 在浏览器中打开应用
4. 在输入框中输入消息
5. 按 Enter 发送消息（Shift+Enter 换行）
6. 等待 AI 回复

### 键盘快捷键

- **Enter**：发送消息
- **Shift + Enter**：在消息中换行

### 消息显示

- 👤 **用户消息**：显示在右侧，蓝色背景
- 🤖 **AI 消息**：显示在左侧，灰色背景
- ⏳ **加载状态**：显示三个跳动的点

## 🔗 与后端集成

本项目需要配合后端服务 [ai-agent-works](../ai-agent-works) 使用。

### 后端 API 要求

后端需提供以下 GraphQL API：

```graphql
# 发送聊天消息
mutation Chat($input: ChatInput!) {
  chat(input: $input) {
    message {
      role
      content
    }
    model
    usage {
      promptTokens
      completionTokens
      totalTokens
    }
  }
}

# 获取模型列表（可选）
query GetModels {
  models {
    id
    object
    created
    ownedBy
  }
}
```

### API 调用流程

```
用户输入消息
    ↓
ChatBox 组件处理
    ↓
调用 sendChatMessage()
    ↓
GraphQL API 请求
    ↓
后端 AI 服务处理
    ↓
返回 AI 回复
    ↓
更新消息列表
```

## 📦 部署

### Cloudflare Pages

1. 构建项目：
```bash
npm run build
```

2. 将 `dist/` 目录部署到 Cloudflare Pages

3. 配置环境变量：
   - 在 Cloudflare Pages 设置中添加环境变量
   - `VITE_API_ENDPOINT`: 后端 API 地址

### 其他平台

本项目是标准的静态 Web 应用，可以部署到任何支持静态文件托管的平台：

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- 等等

## 🔧 开发指南

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 React Hooks 最佳实践
- 组件使用函数式写法
- 使用 CSS Modules 避免样式冲突

### 添加新组件

1. 在 `src/components/` 创建组件文件
2. 创建对应的 CSS 文件
3. 添加 TypeScript 类型定义
4. 在需要的地方导入使用

### 修改 API 配置

编辑 `src/services/chatApi.ts` 文件：

```typescript
// 修改 API 端点
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'your-default-endpoint';

// 修改请求参数
export async function sendChatMessage(input: ChatInput): Promise<ChatResponse> {
  // 自定义请求逻辑
}
```

## 🐛 故障排查

### API 连接失败

**问题**：无法连接到后端 API

**解决方案**：
1. 检查 `.env` 文件中的 `VITE_API_ENDPOINT` 配置
2. 确认后端服务已启动并正常运行
3. 检查浏览器控制台的错误信息
4. 确认后端 CORS 配置正确

### 消息发送失败

**问题**：点击发送后没有响应

**解决方案**：
1. 打开浏览器开发者工具，查看 Network 标签
2. 检查 GraphQL 请求是否发送成功
3. 查看响应内容，确认错误原因
4. 检查后端服务的日志

### 样式问题

**问题**：界面显示异常

**解决方案**：
1. 清除浏览器缓存
2. 重新构建项目 `npm run build`
3. 检查 CSS 文件是否正确导入

## 📄 许可证

本项目采用 MIT 许可证

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至：your-email@example.com

---

**注意**：本项目需要配合后端服务 [ai-agent-works](../ai-agent-works) 使用，请确保后端服务正常运行。
