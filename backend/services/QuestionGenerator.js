const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.post('/questionGenerator', async (req, res) => {
    const API_KEY = process.env.GEMINI_API_KEY1;
    // console.log("Question Generator API_KEY",API_KEY);
    const jobDescription = req.body.description;

    // console.log(jobDescription);
    try{
        if (!jobDescription) {
            return res.status(400).json({ error: 'Job description is required' });
        }
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
        });
        const prompt = `Based on the following job description, generate 1 technical interview questions that would be appropriate for this role. Format the response as a JSON array of strings containing only the questions:
        Job Description: ${jobDescription}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // console.log("text---",text);
        // console.log("result----",result);
        // console.log("response----",response);
        
        try {
            // Try to parse the response as JSON
            //cursor changes
            let questions = [];
            
            // Check if the text looks like JSON (starts with [ and ends with ])
            if (text.trim().startsWith('[') && text.trim().endsWith(']')) {
                try {
                    questions = JSON.parse(text);
                } catch (jsonError) {
                    console.error('Failed to parse direct JSON:', jsonError);
                    // If direct parsing fails, try to extract JSON from the text
                    const jsonMatch = text.match(/\[[\s\S]*\]/);
                    if (jsonMatch) {
                        try {
                            questions = JSON.parse(jsonMatch[0]);
                        } catch (extractError) {
                            console.error('Failed to parse extracted JSON:', extractError);
                        }
                    }
                }
            }
            
            // If we still don't have valid questions, split by quotes and newlines
            if (!Array.isArray(questions) || questions.length === 0) {
                // Try to extract individual questions by splitting the text
                questions = text
                    .replace(/```json|```/g, '') // Remove markdown code blocks if present
                    .split(/",\s*"/) // Split by quote-comma-quote pattern
                    .map(q => q.replace(/^\s*\[\s*"|"\s*\]\s*$/g, '').trim()) // Clean up brackets and quotes
                    .filter(q => q.length > 0); // Remove empty strings
            }
            
            // If we still don't have questions, use the text as a single question
            if (!Array.isArray(questions) || questions.length === 0) {
                questions = [text];
            }
            //cursor changes end
            
            return res.json({ questions });
        } catch (parseError) {
            // If all parsing fails, send the text as a single question
            console.error('Failed to parse response:', parseError);
            return res.json({ questions: [text] });
        }

    }catch(error){
        console.error('Error generating questions:', error);
        return res.status(500).json({ error: 'Failed to generate questions' });
    }
});

module.exports = router;
