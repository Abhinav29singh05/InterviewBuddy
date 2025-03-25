// This is App.js file 

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const questionGeneratorService = require('./services/QuestionGenerator');
const interviewAnalyzerService = require('./services/InterviewAnalyzer');
// const audioTranscriptionService = require('./services/AudioTranscriptionService');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Add this before MongoDB connection attempt
app.get('/api/status', (req, res) => {
  res.json({ status: 'API running', env: process.env.NODE_ENV });
});

app.get('/api/env-test', (req, res) => {
  res.json({ 
    mongoUriExists: !!process.env.MONGODB_URI,
    // Only show first few characters of sensitive info
    mongoUriPrefix: process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.substring(0, 20) + '...' : 'not set'
  });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Interview-Simulator';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
    console.error('MongoDB connection error details:', {
        message: err.message,
        reason: err.reason,
        code: err.code
    });
    // Still allow server to start for debugging
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', questionGeneratorService);
app.use('/api/services', interviewAnalyzerService);
// app.use('/api', audioTranscriptionService);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
