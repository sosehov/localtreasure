const db = require('../connection');

const getMessages = (sender_id, reciever_id) => {
  // get messages from sender to reciver, or reciver to sender
  const query_str = 'SELECT * FROM messages WHERE (sender_id = $1 AND reciever_id = $2) OR (sender_id = $2 AND reciever_id = $1) ORDER BY sendtime';
  const query_args = [sender_id, reciever_id];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
};

module.exports = { getMessages };