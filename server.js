require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend", "dist")));

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const pdfParse = require("pdf-parse");
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({
        error: "无法从 PDF 中提取文本，请确保 PDF 不是图片格式",
      });
    }

    const client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com",
    });

    const aiResponse = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "你是一位专业HR和技术面试官。\n\n请分析这份简历：\n\n1. 简历有哪些问题\n2. 技术栈是否明确\n3. 项目描述是否专业\n4. 是否缺少量化成果\n5. 给出优化建议\n6. 生成5个面试题",
        },
        { role: "user", content: resumeText },
      ],
    });

    res.json({
      result: aiResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || "分析失败",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI 简历分析器已启动: http://localhost:${PORT}`);
});
