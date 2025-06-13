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

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const authApiRoutes = require('./routes/auth-api');
const eventsApiRoutes = require('./routes/events-api.js');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const saleRoutes = require('./routes/sales-api.js')
const messagesRoutes = require('./routes/messages');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/auth', authApiRoutes);
app.use('/api/events', eventsApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/api/sales', saleRoutes);
app.use('/messages', messagesRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});


// change this to db later
const users = [];
let id = 1;

io.on('connection', (socket) => {
  const name = socket.id;
  users.push(name);

  socket.emit('NEW_CONNECTION', { name, users });
  socket.broadcast.emit('NEW_USER', { name });
  console.log("someone has connected");

  socket.on('SEND_MESSAGE', payload => {
    console.log("message has been sent by client");
    io.emit('NEW_MESSAGE', {id, ...payload});
    id++;
  })
  
});


server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
