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
  const createTime = new Date().toISOString();
  const query_str = 'INSERT INTO rooms(sender_id, receiver_id, createtime) VALUES ($1, $2, $3)';
  const query_args = [sender_id, receiver_id, createTime];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
}

const roomExists = (sender_id, receiver_id) => {
  const query_str = 'SELECT * FROM rooms WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)';
  const query_args = [sender_id, receiver_id];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows.length > 0;
  });
}

module.exports = { getRooms, createRoom, roomExists };