const db = require('../connection');

const getMessages = (sender_id, receiver_id) => {
  // get messages from sender to reciver, or reciver to sender
  const query_str = 'SELECT * FROM messaging WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY sendtime';
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