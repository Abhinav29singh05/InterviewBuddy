const express = require('express');
const router = express.Router();
const User = require('../schema/user.js');
const bcrypt = require('bcryptjs');

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        console.log(username,email,password, hashedPassword);

        // Save user to database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup', error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        // console.log(req.body);
        // console.log(email,password,"ghgh");
        const user = await User.findOne({ email });
        if (!user) {
            // console.log("Error: Invalid email entered -", email);
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            // console.log("Error: Invalid password entered -", password);
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Send success response
        res.status(200).json({ 
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        // console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes loaded successfully' });
});

module.exports = router;
