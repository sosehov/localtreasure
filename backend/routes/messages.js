const express = require('express');
const router  = express.Router();
const messageQueries = require('../db/queries/messages');

router.get('/', (req, res) => {
  console.log('user on backend inside messages route:', req.query.senderId, req.query.receiverId);
  messageQueries.getMessages(req.query.senderId, req.query.receiverId)
    .then(messages => {
      res.json( { messages });
    })
    .catch(err => {
      console.log('error getting messages:', err);
    });
}); 

module.exports = router;