const express = require('express');
const router  = express.Router();
const messageQueries = require('../db/queries/messages');

router.get('/', (req, res) => {
  messageQueries.getMessages(sender_id, reciever_id)
    .then(messages => {
      res.json( { messages });
    })
    .catch(err => {
      console.log('error getting messages:', err);
    });
}); 

module.exports = router;