// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));

app.set('view engine', 'ejs');

// Middleware

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Import authentication middleware for protected routes
const { authenticateUser } = require('./middleware/auth');

// Separated Routes for each Resource
const userApiRoutes = require('./routes/users-api');
const authApiRoutes = require('./routes/auth-api');
const eventsApiRoutes = require('./routes/events-api.js');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const saleRoutes = require('./routes/sales-api.js')
const userEventsRoutes = require('./routes/user-events-api.js')
const favouritesRoutes = require('./routes/favourites-api.js')


// Mount all resource routes
app.use('/api/auth', authApiRoutes); // Auth routes (public)
app.use('/api/users', authenticateUser, userApiRoutes); // Protected
app.use('/api/events', authenticateUser, eventsApiRoutes); // Protected
app.use('/api/widgets', authenticateUser, widgetApiRoutes); // Protected
app.use('/api/sales', authenticateUser, saleRoutes); // Protected
app.use('/api/user-events', authenticateUser, userEventsRoutes); // Protected
app.use('/users', usersRoutes);
app.use('/api/favourites', favouritesRoutes);

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});