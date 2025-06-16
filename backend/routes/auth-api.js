const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authQueries = require('../db/queries/auth');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Password length validation
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await authQueries.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Save user to DB
    const newUser = await authQueries.createUser(name, email, password);

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isAdmin: newUser.is_admin || false
      },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isAdmin: newUser.is_admin || false
      }
    });

  } catch (error) {
    console.error('Registration error:', error);

    // Handle specific DB errors
    if (error.code === '23505') {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    res.status(500).json({ error: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await authQueries.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Simple password comparison
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.is_admin || false
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.is_admin || false
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Token validation endpoint
router.get('/verify', require('../middleware/auth').authenticateUser, (req, res) => {
  res.json({
    message: 'Token is valid',
    user: {
      id: req.user.user_id,
      email: req.user.email,
      name: req.user.name,
      isAdmin: req.user.isAdmin || false
    }
  });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' }); // Logout is handled client-side by removing the token
});

module.exports = router;