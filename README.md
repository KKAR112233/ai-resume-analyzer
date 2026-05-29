# AI Resume Analyzer
一个基于 React + Node.js + Python + DeepSeek API 的 AI 简历分析项目。
支持上传 PDF 简历，自动提取文本，并使用 AI 生成简历优化建议。

---

# 项目功能

* PDF 简历上传
* Python 提取 PDF 文本
* DeepSeek AI 简历分析
* 前后端分离架构
* React 现代化界面
* OpenCode 辅助开发

---

# 技术栈

## Frontend
* React
* Vite
* Axios

## Backend
* Node.js
* Express

## Python Service
* FastAPI
* pdfplumber

## AI
* DeepSeek API

---

# 项目结构

```bash
ai-resume-analyzer/
│
├── frontend/          # React 前端
├── backend/           # Node.js 后端
├── python-service/    # Python PDF 解析服务
```

---

# 环境要求

请先安装：
* Node.js 18+
* Python 3.10+
* Git

---

# 项目启动步骤

## 1. 克隆项目

```bash
git clone https://github.com/KKAR112233/ai-resume-analyzer.git
```

---

## 2. 启动前端

进入 frontend：

```bash
cd frontend
npm install
npm run dev
```

前端默认运行：

```txt
http://localhost:5173
```

---

## 3. 启动后端

新开终端：

```bash
cd backend
npm install
node server.js
```

后端默认运行：

```txt
http://localhost:3000
```

---

## 4. 启动 Python PDF 服务

新开终端：

```bash
cd python-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Python 服务默认运行：

```txt
http://127.0.0.1:8000
```

---

# DeepSeek API 配置

在 backend 文件夹创建：

```txt
.env
```

添加：

```env
DEEPSEEK_API_KEY=你的DeepSeekAPIKey
```

---

# 使用流程

1. 启动前后端和 Python 服务
2. 打开前端页面
3. 上传 PDF 简历
4. 点击“开始分析”
5. 获取 AI 简历优化建议

---

# 项目亮点

* 使用 OpenCode 辅助开发
* 实现前后端联调
* 支持 AI 文本分析
* 支持 PDF 文件解析
* 独立完成 GitHub 项目管理

---

# 后续优化方向

* 支持 DOCX 简历
* 支持 AI 打分系统
* 增加登录功能
* 增加历史记录
* 部署上线

---

# 作者

GitHub: https://github.com/KKAR112233
