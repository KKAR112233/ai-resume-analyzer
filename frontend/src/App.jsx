import { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("请先选择 PDF 文件");
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("resume", file);
      const { data } = await axios.post("/upload", fd);
      setResult(data.result);
    } catch {
      alert("上传失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">&#x1F4C4;</div>
        <h1>AI 简历分析器</h1>
        <p>上传 PDF 简历，获取专业分析与面试建议</p>
      </header>

      <section className="upload-card">
        <label className={`dropzone ${file ? "has-file" : ""}`}>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span className="dropicon">{file ? "\u2705" : "\u{1F4C1}"}</span>
          <span className="droptext">
            {file ? "已选择文件" : "点击选择 PDF 简历"}
          </span>
          {file && <span className="filename">{file.name}</span>}
        </label>

        <button
          className="btn"
          disabled={loading || !file}
          onClick={handleUpload}
        >
          {loading ? "分析中..." : "开始分析"}
        </button>
      </section>

      {loading && (
        <div className="loading">
          <div className="spinner" />
          <p>AI 正在分析简历，请稍候...</p>
        </div>
      )}

      {result && !loading && (
        <section className="result-card">
          <h2>&#x2728; 分析结果</h2>
          <pre>{result}</pre>
        </section>
      )}
    </div>
  );
};

export default App;
