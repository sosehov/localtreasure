// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Webscoket
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 8080;
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST']
  }
});

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
const locationsRoute = require('./routes/locations-api.js');
const messagesRoutes = require('./routes/messages-api.js');
const userEventsRoutes = require('./routes/user-events-api.js')



// Mount all resource routes
app.use('/api/auth', authApiRoutes);
app.use('/api/users', authenticateUser, userApiRoutes); // Protected
app.use('/api/events', eventsApiRoutes);
app.use('/api/widgets', authenticateUser, widgetApiRoutes); // Protected

app.use('/api/sales', saleRoutes); // Protected
app.use('/api/user-events', userEventsRoutes); // Protected
app.use('/users', usersRoutes);

app.use('/api/locations', locationsRoute);

// app.use('/api/sales', saleRoutes);
app.use('/api/messages', messagesRoutes);



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


// change this to db later
const users = [];

io.on('connection', (socket) => {
  const name = socket.id;
  users.push(name);

  socket.emit('NEW_CONNECTION', { name, users });
  socket.broadcast.emit('NEW_USER', { name });
  console.log(name, "someone has connected");

  socket.on('SEND_MESSAGE', message => {
    console.log("message has been sent by client", message);
    io.emit('NEW_MESSAGE', message);
  })

  socket.on('disconnect', () => {
    console.log(name, 'someone has disconnected');
  });
  
});


server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});