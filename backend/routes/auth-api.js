const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async(req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Email, password, and name are required'
      });
    }

    // TODO: Check if user already exists
    // TODO: Hash password
    // TODO: Save user to database
    // TODO: Generate JWT token

    res.status(201).json({
      message: 'User registered successfully',
      // user: { id, email, name } // Don't send password
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});
