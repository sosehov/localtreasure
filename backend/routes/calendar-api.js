const express = require('express');
const router = express.Router();

// Get all events for a user
router.get('/calendar', (req, res) => {
  const userId = req.user.id;
  db.query('SELECT * FROM events WHERE user_id = $1', [userId])
    .then(data => res.json(data.rows))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Create a new event
router.post('/calendar', (req, res) => {
  const { title, description, event_date } = req.body;
  const userId = req.user.id;
  db.query(`
    INSERT INTO calendar_events (user_id, title, description, event_date)
    VALUES ($1, $2, $3, $4) RETURNING *
  `, [userId, title, description, event_date])
    .then(data => res.json(data.rows[0]))
    .catch(err => res.status(500).json({ error: err.message }));
});