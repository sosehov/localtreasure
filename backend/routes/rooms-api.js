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

router.post('/', authenticateUser, (req, res) => {
  if(!roomQueries.roomExists(req.query.senderId, req.query.senderId)) {
    roomQueries.createRoom(req.query.senderId, req.query.senderId)
      .then(() =>
        res.status()
      )
      .catch(err => {
        console.log('error creating room:', err);
      });
  } else {
    res.send({'room' : 'room already exists'});
  }
}); 

router.post('/delete/:rid', authenticateUser, (req, res) => {
  roomQueries.deleteRoom(req.params.rid)
    .then(() =>
      res.status()
    )
    .catch(err => {
      console.log('error deleting room:', err);
    });
}); 


module.exports = router;

