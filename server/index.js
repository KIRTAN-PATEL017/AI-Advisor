const express = require("express");
const multer = require("multer");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const callHFapi = require("./hf-api");

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

app.post("/file", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file || file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Please upload a PDF file." });
    }

    const data = await pdfParse(file.buffer);
    const extractedText = data.text;
    const prompt = `
You are an AI career advisor. Analyze the following resume and return a JSON in this exact format:
{
  "roles": [...],
  "skills": [...],
  "improvements": [{ "original": "...", "suggestion": "..." }],
  "summary": "..."
}

Only return the final JSON result, no explanation or extra commentary.

Resume:
${extractedText}`;

    const resultText = await callHFapi(prompt);
    const content = resultText.choices[0].message.content;
    const parsedObject = JSON.parse(content.trim());
    res.json(parsedObject);
  } catch (error) {
    console.error("PDF parse error:", error);
    res
      .status(500)
      .json({ error: "Failed to parse PDF", details: error.message });
  }
});

app.post("/text", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return res
        .status(400)
        .json({ error: "Text is required and must be a non-empty string." });
    }
    const prompt = `
You are an AI career advisor. Analyze the following resume and return a JSON in this exact format:
{
  "roles": [...],
  "skills": [...],
  "improvements": [{ "original": "...", "suggestion": "..." }],
  "summary": "..."
}

Only return the final JSON result, no explanation or extra commentary.

Resume:
${text}`;

    const resultText = await callHFapi(prompt);
    const content = resultText.choices[0].message.content;
    const parsedObject = JSON.parse(content.trim());
    res.json(parsedObject);
  } catch (error) {
    console.error("Text endpoint error:", error);
    res
      .status(500)
      .json({ error: "Failed to process text", details: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
