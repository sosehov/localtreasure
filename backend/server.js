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
const messagesRoutes = require('./routes/messages-api.js');
const userEventsRoutes = require('./routes/user-events-api.js');
const roomRoutes = require('./routes/rooms-api.js');


// Mount all resource routes
app.use('/api/auth', authApiRoutes);
app.use('/api/users', authenticateUser, userApiRoutes); // Protected
app.use('/api/events', eventsApiRoutes);
app.use('/api/widgets', authenticateUser, widgetApiRoutes); // Protected

app.use('/api/sales', saleRoutes); // Protected
app.use('/api/user-events', userEventsRoutes); // Protected
app.use('/users', usersRoutes);
app.use('/api/messages', messagesRoutes); // Protected
app.use('/api/messageRooms', roomRoutes); // Protected


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


// list of users and which socket they connected to
const userSocketMap = {};
// helper function
const getUserFromSocket = (socket_id) => {
  return Object.keys(userSocketMap).filter((key) => userSocketMap.key === socket_id) 
};

io.on('connection', (socket) => {

  socket.on('NEW_USER', (user_id) => {
    userSocketMap[user_id] = socket.id;
    console.log('userSocketMap after new user:', userSocketMap);
  });

  socket.on('SEND_MESSAGE', message => {
    console.log("message has been sent by sender client", message);
    const recieverSocketId = userSocketMap[message.reciever_id];
    if (recieverSocketId) {
      io.to(recieverSocketId).emit('RECIEVE_MESSAGE', message);
    }
    io.emit('SENT_MESSAGE', message);
  })

  socket.on('disconnect', () => {
    const [ user ] = getUserFromSocket(socket.id);
    delete userSocketMap[user];
    console.log(`${user} has disconnected`);
  });
  
});


server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});