const express = require('express');
const router  = express.Router();
const eventsQueries = require('../db/queries/events');


router.post('/createEvent', async  (req, res) => {
  const { user_id, title, description, date, start_time, end_time, address, category_id } = req.body;

  if (!title || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

 try {
    const result = await eventsQueries.createUserEvent({ user_id, title, description, date, start_time, end_time, address, category_id });
    res.status(201).json({ message: 'Events created' });
  } catch (err) {
    res.status(500).json({ error: 'Database insert failed' });
  }
});

module.exports = router;