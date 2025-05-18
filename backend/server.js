// This is App.js file 

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const questionGeneratorService = require('./services/QuestionGenerator');
const interviewAnalyzerService = require('./services/InterviewAnalyzer');
const Razorpay = require("razorpay")
const crypto = require('crypto');
// const audioTranscriptionService = require('./services/AudioTranscriptionService');
const askAIService = require('./services/AskAI');

const app = express();
const PORT = process.env.PORT || 8080;

// Razorpay Configuration
const razorpay = new Razorpay({
    key_id: "rzp_test_TcSyaOAtIyo5U3",
    key_secret: "g7Hnf5nuQx6VjtXofViykn0e"
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Interview Buddy API is running');
});

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
app.use('/api/services', askAIService);
// RazorPay Endpoints
app.post('/razorpay', async(req, res) => {
  try {
    const options = {
      amount: req.body.amount || 100, // amount in smallest currency unit (paise)
      currency: req.body.currency || "INR",
      receipt: "receipt_" + Date.now()
    };
    
    const order = await razorpay.orders.create(options);
    
    res.json({
      order_id: order.id,
      currency: order.currency,
      amount: order.amount
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).send("Error creating Razorpay order");
  }
});

// For backward compatibility - redirect to the new endpoint
app.post('/orders', async(req, res) => {
  try {
    const options = {
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: "receipt#" + Date.now(),
      payment_capture: 1
    };

    const response = await razorpay.orders.create(options);

    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount
    });
  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(500).send("Internal server error");
  }
});

// Payment verification endpoint
app.post('/verify', async(req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "g7Hnf5nuQx6VjtXofViykn0e")
      .update(sign.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment is verified
      res.status(200).json({
        success: true,
        message: "Payment has been verified",
        payment_id: razorpay_payment_id
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during verification"
    });
  }
});

app.get("/payment/:paymentId", async(req, res) => {
  const {paymentId} = req.params;
  
  try {
    const payment = await razorpay.payments.fetch(paymentId);

    if (!payment){
      return res.status(500).json("Error at razorpay loading");
    }

    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency
    });
  } catch(error) {
    console.error("Payment fetch error:", error);
    res.status(500).json("Failed to fetch payment");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
