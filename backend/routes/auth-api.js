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

router.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // TODO: Find user by email
    // TODO: Compare password with hashed password
    // TODO: Generate JWT token

    res.json({
      message: 'Login successful',
      // token: 'jwt_token here',
      // user: { id, email, name }
    });

  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});