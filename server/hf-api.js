require("dotenv").config();
const axios = require("axios");
const apiKey = process.env.YOUR_GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
const headers = {
  "Content-Type": "application/json",
};

const apiCall = async (data) => {
  const prompt = `You are an AI career advisor. Analyze the following resume, and suggest suitable job roles, skills of the person, improvements and summary.Return the result in JSON in this exact format:{roles: [...], skills: [...], improvements": [{ original: ..., suggestion: ...}],summary": ...} Only return the final JSON result, no explanation or extra commentary.Resume:${data}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };
  try {
    const res = await axios.post(url, payload, { headers });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  apiCall,
};
