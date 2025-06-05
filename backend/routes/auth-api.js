const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authQueries = require('../db/queries/auth');

// Simple secret for demo purposes
const JWT_SECRET = 'demo-secret-key';

router.post('/register', async(req, res) => {
  try {
    const { email, password, name } = req.body;

    // Basic validation
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Email, password, and name are required'
      });
    }

    // Check if user already exists
    const existingUser = await authQueries.getUserByEmail(email);
    if (existingUser) {
      return res.status(4400).json({
        error: 'User with this email already exists'
      });
    }

    // Save user to database
    const newUser = await authQueries.createUser(name, email, password);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email:newUser.email },
      JWT_SECRET,
      { expiresIn: '24' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
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

    // Find user by email
    const user = await authQueries.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    // Simple password comparison (plain text for demo)
    if (password !== user.password) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router;