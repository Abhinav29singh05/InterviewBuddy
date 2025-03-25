const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schema/user.js');

router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = await user.generateAuthToken();
        res.status(200).json({ user, token });
        console.log(user, token,"Login Success");
    }
    catch(error){
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
})