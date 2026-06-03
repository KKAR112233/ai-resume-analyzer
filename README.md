# AI 简历分析器

上传 PDF 简历，AI 自动分析并给出优化建议与面试题。

## 主要文件

```
ai-resume-analyzer/
├── server.js            # 服务端入口（PDF 解析 + DeepSeek API + 静态文件服务）
├── package.json         # 项目依赖与启动脚本
├── .env.example         # API Key 配置模板
├── .gitignore
└── frontend/            # React 前端
    └── src/
        ├── App.jsx      # 主页面（上传、展示结果）
        ├── App.css      # 页面样式
        ├── index.css    # 全局样式
        └── main.jsx     # React 入口
```

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 配置 API Key
copy .env.example .env
# 编辑 .env，填入你的 DeepSeek API Key

# 3. 构建前端
npm run build

# 4. 启动服务
npm start
```

浏览器打开 `http://localhost:3000`，上传 PDF 简历即可。

## 开发

```bash
# 终端1：启动后端
npm start

# 终端2：启动前端（热更新）
cd frontend && npm run dev
```

前端开发服务器自动代理 API 请求到后端，无需额外配置。

## 技术栈

- **前端**: React + Vite + Axios
- **后端**: Node.js + Express
- **PDF 解析**: pdf-parse
- **AI**: DeepSeek API
