const db = require('../connection');

const getSentMessages = (sender_id, reciever_id) => {
  const query_str = 'SELECT * FROM messages WHERE (sender_id = $1 AND reciever_id = $2)';
  const query_args = [sender_id, reciever_id];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
};

const getReplies = (sender_id, reciever_id) => {
  const query_str = 'SELECT * FROM messages WHERE (sender_id = $1 AND reciever_id = $2)';
  const query_args = [reciever_id, sender_id];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
};

module.exports = { getSentMessages, getReplies};