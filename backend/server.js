require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

const app = express();

app.use(cors());

const upload = multer({
  dest: "uploads/",
});

app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const formData = new FormData();

    formData.append(
      "file",
      fs.createReadStream(req.file.path),
      req.file.originalname
    );

    const pythonResponse = await axios.post(
      "http://127.0.0.1:8000/read-pdf",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    const resumeText = pythonResponse.data.text;

const aiResponse = await client.chat.completions.create({
  model: "deepseek-chat",
  messages: [
    {
      role: "system",
      content: `
你是一位专业HR和技术面试官。

请分析这份简历：

1. 简历有哪些问题
2. 技术栈是否明确
3. 项目描述是否专业
4. 是否缺少量化成果
5. 给出优化建议
6. 生成5个面试题
`,
    },
    {
      role: "user",
      content: resumeText,
    },
  ],
});

res.json({
  result: aiResponse.choices[0].message.content,
});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});