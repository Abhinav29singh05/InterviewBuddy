const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai"); // or OpenAI, etc.

router.post('/ask-ai', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });

    const API_KEY = process.env.GEMINI_API_KEY3;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();
    
    res.json({ answer: text });
  } catch (error) {
    console.error('AskAI error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

module.exports = router;