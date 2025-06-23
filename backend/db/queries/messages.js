const db = require('../connection');

const getMessages = (sender_id, receiver_id) => {
  // get messages from sender to reciver, or reciver to sender
  const query_str = `
  SELECT m.*, 
      sender.name AS sender_name,
      receiver.name AS receiver_name
  FROM messaging m
  JOIN users sender ON m.sender_id = sender.id
  JOIN users receiver ON m.receiver_id = receiver.id
  WHERE (m.sender_id = $1 AND m.receiver_id = $2) 
    OR (m.sender_id = $2 AND m.receiver_id = $1)
  ORDER BY m.sendtime`;
  const query_args = [sender_id, receiver_id];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
};

const addMessage = (message) => {
  const query_str = 'INSERT INTO messaging(sender_id, receiver_id, content, sendtime) VALUES ($1, $2, $3, $4)';
  const query_args = [message.sender_id, message.receiver_id, message.content, message.sendtime];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
}

module.exports = { getMessages, addMessage };