const express = require('express');
const router  = express.Router();
const roomQueries = require('../db/queries/rooms');
const { authenticateUser } = require('../middleware/auth');

router.get('/', authenticateUser, (req, res) => {
  roomQueries.getRooms(req.query.senderId)
    .then(rooms => {
      res.json( { rooms });
    })
    .catch(err => {
      console.log('error getting rooms:', err);
    });
}); 

router.post('/', authenticateUser, async (req, res) => {
  try {
    const sender_id = req.query.senderId;
    const receiver_id = req.query.receiverId;
    const exists = await roomQueries.roomExists(sender_id, receiver_id);
  
    if(!exists) {
      console.log('creating room with sender: ', sender_id, ', receiver: ', receiver_id);
      await roomQueries.createRoom(sender_id, receiver_id);
      res.status(200).send('ok');
    } else {
      res.send({'room' : 'room already exists'});
    }
  }
  catch(err) {
      console.log('error creating room:', err);
  }
}); 

router.post('/delete/:rid', authenticateUser, (req, res) => {
  roomQueries.deleteRoom(req.params.rid)
    .then(() =>
      res.status(200).send('ok')
    )
    .catch(err => {
      console.log('error deleting room:', err);
    });
}); 


module.exports = router;

