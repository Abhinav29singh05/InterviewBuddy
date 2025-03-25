const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * API endpoint to analyze interview transcripts using Google's Gemini AI.
 * This service takes the transcribed responses from Whisper API and analyzes them.
 */
router.post('/analyzeInterview', async (req, res) => {
    try {
        const { questions, recordings, jobDescription } = req.body;
        
        if (!questions || !recordings || !jobDescription) {
            return res.status(400).json({ error: 'Questions, recordings, and job description are required' });
        }
        
        const API_KEY = process.env.GEMINI_API_KEY2;
        // console.log("Interview Analyzer API_KEY",API_KEY);
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
        });
        
        // console.log("Analyzing interview for job description:", jobDescription);
        // console.log("Number of questions:", questions.length);
        // console.log("Number of transcripts:", recordings.length);
        
        // Prepare prompt with transcripts from Whisper API
        const prompt = `
        You are an expert interviewer and career coach. Analyze this technical interview for a candidate.
        
        Job Description: ${jobDescription}
        
        Questions and candidate responses:
        ${recordings.map((rec, i) => 
            `Question ${i+1}: ${rec.question || `Question ${rec.questionIndex + 1}`}
            Candidate's Answer: ${rec.transcript}`
        ).join('\n\n')}
        
        Provide a detailed analysis including:
        1. Overall performance score (0-100)
        2. Key strengths (bullet points)
        3. Areas for improvement (bullet points)
        4. Per-question analysis with scores and specific feedback 
        
        Format the response as a JSON object with the following structure:
        {
            "overallScore": number,
            "strengths": [string, string, ...],
            "weaknesses": [string, string, ...],
            "questionAnalysis": [
                {
                    "questionIndex": number,
                    "score": number,
                    "feedback": string(50-60 words max),
                    "improvementTips": string(exactly 3 numbered improvement tips)
                },
                ...
            ]
        }
        `;
        
        try {
            // Call Gemini API for analysis
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            // console.log('Raw Gemini response:', text); // Log the full response for debugging
            
            // Clean and parse the JSON response
            const cleanedText = cleanJsonString(text);
            // console.log('Cleaned Gemini response:', cleanedText);
            
            let analysis;
            try {
                analysis = JSON.parse(cleanedText);
                
                // Validate the analysis object structure
                if (!analysis.overallScore || !Array.isArray(analysis.strengths) || 
                    !Array.isArray(analysis.weaknesses) || !Array.isArray(analysis.questionAnalysis)) {
                    console.warn('Invalid analysis structure, attempting to fix...');
                    
                    // Ensure all required fields exist with default values if missing
                    analysis = {
                        overallScore: analysis.overallScore || 0,
                        strengths: Array.isArray(analysis.strengths) ? analysis.strengths : [],
                        weaknesses: Array.isArray(analysis.weaknesses) ? analysis.weaknesses : [],
                        questionAnalysis: Array.isArray(analysis.questionAnalysis) ? analysis.questionAnalysis.map(qa => ({
                            ...qa,
                            questionIndex: qa.questionIndex || 0,
                            score: qa.score || 0,
                            feedback: qa.feedback || '',
                            improvementTips: qa.improvementTips || ''
                        })) : []
                    };
                }
                
                // Add question text to analysis if missing
                if (analysis.questionAnalysis) {
                    analysis.questionAnalysis = analysis.questionAnalysis.map((qa, index) => ({
                        ...qa,
                        question: questions[index]?.text || `Question ${index + 1}`,
                        questionIndex: index
                    }));
                }
                
                // Log successful analysis
                // console.log('Final analysis being sent to frontend:', JSON.stringify(analysis, null, 2));
                return res.json(analysis);
            } catch (parseError) {
                console.error('Error parsing Gemini response:', parseError);
                console.error('Cleaned text:', cleanedText);
                
                // Attempt to extract any valid JSON substring if possible
                const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    try {
                        analysis = JSON.parse(jsonMatch[0]);
                        console.log('Recovered partial JSON from response');
                        console.log('Recovered analysis:', JSON.stringify(analysis, null, 2));
                        return res.json(analysis);
                    } catch (extractError) {
                        console.error('Failed to recover JSON:', extractError);
                        throw new Error('Failed to parse Gemini response');
                    }
                }
                throw new Error('Failed to parse Gemini response');
            }
        } catch (geminiError) {
            console.error('Gemini API error:', geminiError);
            console.error('Error details:', geminiError.message);
            
            if (geminiError.response) {
                console.error('API Response status:', geminiError.response.status);
                console.error('API Response data:', geminiError.response.data);
            }
            
            // Only use mock response for actual API failures
            if (!geminiError.message.includes('Failed to parse Gemini response')) {
                console.log("Using fallback mock analysis due to API error");
                
                // Mock response for development purposes
                const mockAnalysis = {
                    overallScore: 85,
                    strengths: [
                        "Strong technical knowledge demonstrated in most answers",
                        "Clear communication style",
                        "Good problem-solving approach"
                    ],
                    weaknesses: [
                        "Some hesitation in the response to question 2",
                        "Could provide more specific examples in answers"
                    ],
                    questionAnalysis: recordings.map((rec, index) => ({
                        questionIndex: index,
                        question: questions[index]?.text || `Question ${index + 1}`,
                        score: Math.floor(70 + Math.random() * 30),
                        feedback: `Your answer was ${Math.random() > 0.5 ? 'well structured' : 'clear and concise'}.`,
                        improvementTips: `Consider adding more ${Math.random() > 0.5 ? 'specific examples' : 'technical details'} in your response.`
                    }))
                };
                
                return res.json(mockAnalysis);
            }
            
            // Re-throw parsing errors
            throw geminiError;
        }
        
    } catch (error) {
        console.error('Error analyzing interview:', error);
        res.status(500).json({ error: 'Failed to analyze interview' });
    }
});

// Function to clean JSON string
const cleanJsonString = (str) => {
  try {
    // Remove markdown code block markers if present
    let cleaned = str.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    // Remove any leading/trailing whitespace
    cleaned = cleaned.trim();
    // Remove any trailing commas in arrays or objects which are invalid JSON
    cleaned = cleaned.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
    
    // Check if the string is valid JSON by parsing and stringifying it
    const parsed = JSON.parse(cleaned);
    return JSON.stringify(parsed);
  } catch (error) {
    console.error('Error cleaning JSON string:', error);
    console.log('Original string:', str);
    return str; // Return the original string and let the caller handle the error
  }
};

module.exports = router; 