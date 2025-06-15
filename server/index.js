const express = require("express");
const multer = require("multer");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const { apiCall } = require("./hf-api");

const app = express();
const upload = multer();

app.use(cors({ origin: "https://ai-advisor-lemon.vercel.app" }));
app.use(express.json());

app.post("/file", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file || file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Please upload a PDF file." });
    }

    const data = await pdfParse(file.buffer);
    const extractedText = data.text;

    const resultText = await apiCall(extractedText);
    const responseText = resultText?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error("Invalid response from Gemini API");
    }

    const cleanedText = responseText
      .replace(/^```(?:json)?/i, "") // Remove ``` or ```json
      .replace(/```$/, "") // Remove closing ```
      .trim();

    const parsedObject = JSON.parse(cleanedText);

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

    const resultText = await apiCall(text);
    console.log(resultText);
    const responseText = resultText?.candidates[0]?.content?.parts[0]?.text;

    if (!responseText) {
      throw new Error("Invalid response from Gemini API");
    }

    const cleanedText = responseText
      .replace(/^```(?:json)?/i, "") // Remove ``` or ```json
      .replace(/```$/, "") // Remove closing ```
      .trim();

    const parsedObject = JSON.parse(cleanedText);

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
