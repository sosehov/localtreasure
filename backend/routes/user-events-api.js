const express = require('express');
const router  = express.Router();
const eventsQueries = require('../db/queries/events');
const { authenticateUser } = require('../middleware/auth');

// Public
router.get('/allEvents', (req, res) => {
  eventsQueries.getAllEvents()
    .then(events => {
      res.json({ events });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Protected
router.use(authenticateUser);

router.get('/', (req, res) => {
  eventsQueries.getUserEvents(req.query.user)
    .then(events => res.json({ events }))
    .catch(err => res.status(500).json({ error: err.message }));
});

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

router.delete('/deleteEvent', authenticateUser, async (req, res) => {
  const { eventId } = req.body;
  const user_id = req.user.user_id;

  console.log('DELETE request received:', { eventId, user_id });

  if (!eventId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await eventsQueries.deleteUserEvent({ eventId, user_id});

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Event not found or not authorized' });
    }

    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database delete failed' });
  }
});
module.exports = router;
