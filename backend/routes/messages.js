const express = require('express');
const router  = express.Router();
const messageQueries = require('../db/queries/messages');

router.get('/', (req, res) => {
  console.log('user on backend inside messages route:', req.params.sender_id, req.params.reciever_id);
  messageQueries.getMessages(req.params.sender_id, req.params.reciever_id)
    .then(messages => {
      res.json( { messages });
    })
    .catch(err => {
      console.log('error getting messages:', err);
    });
}); 

module.exports = router;