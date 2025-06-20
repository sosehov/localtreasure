const express = require('express');
const router  = express.Router();
const messageQueries = require('../db/queries/messages');
const { authenticateUser } = require('../middleware/auth');

router.get('/', authenticateUser, (req, res) => {
  console.log('user on backend inside messages route:', req.query.senderId, req.query.receiverId);
  messageQueries.getMessages(req.query.senderId, req.query.receiverId)
    .then(messages => {
      res.json( { messages });
    })
    .catch(err => {
      console.log('error getting messages:', err);
    });
}); 

router.post('/', authenticateUser, (req, res) => {
  console.log('req.body.message:', req.body.message);
  messageQueries.addMessage(req.body.message)
    .then(() =>
      res.status(200).send('ok')
    )
    .catch(err => {
      console.log('error writing message:', err);
    });
}); 

module.exports = router;