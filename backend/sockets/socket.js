const messageQueries = require('../db/queries/messages');


// list of users and which socket they connected to
const userSocketMap = {};
// helper function
const getUserFromSocket = (socket_id) => {
  return Object.keys(userSocketMap).filter((key) => userSocketMap[key] === socket_id)
};

module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.on('NEW_USER', ({ user_id, receiver_id }) => {
      // need message info
      const room_id = [user_id, receiver_id].sort().join("_");
      socket.join(room_id);
      console.log('rooms after new user:', io.sockets.adapter.rooms);
      userSocketMap[user_id] = socket.id;
      console.log('userSocketMap after new user:', userSocketMap);
    });

    socket.on('SEND_MESSAGE', message => {
      const room_id = [message.sender_id, message.receiver_id].sort().join("_");
      // console.log("message has been sent by sender client", message);
      console.log('rooms after new message:', io.sockets.adapter.rooms);
      const room = io.sockets.adapter.rooms.get(room_id);
      const receiverSocketId = userSocketMap[message.receiver_id];
      if (room.has(receiverSocketId)) {
        io.to(receiverSocketId).emit('RECEIVE_MESSAGE', message);
      }
      // io.to(room_id).emit('SENT_MESSAGE', message);
      io.emit('SENT_MESSAGE', message);
      messageQueries.addMessage(message);
    })

    socket.on('disconnect', () => {
      const [ user ] = getUserFromSocket(socket.id);
      delete userSocketMap[user];
      console.log(`${user} has disconnected`);
    });

  });
};