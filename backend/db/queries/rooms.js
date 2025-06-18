const db = require('../connection');

const getRooms = (sender_id) => {
  const query_str = 'SELECT * FROM rooms WHERE (sender_id = $1) OR (receiver_id = $1) ORDER BY createtime';
  const query_args = [sender_id];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
};

const createRoom = (sender_id, receiver_id) => {
  const query_str = 'INSERT INTO messaging(sender_id, receiver_id, content, sendtime) VALUES ($1, $2, $3, $4)';
  const query_args = [message.sender_id, message.receiver_id, message.content, message.sendtime];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
}

const roomExists = (sender_id, receiver_id) => {
  const query_str = 'INSERT INTO messaging(sender_id, receiver_id, content, sendtime) VALUES ($1, $2, $3, $4)';
  const query_args = [message.sender_id, message.receiver_id, message.content, message.sendtime];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
}

module.exports = { getRooms, createRoom, roomExists };