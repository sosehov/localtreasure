const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { authenticateUser } = require('../middleware/auth');

// GET /api/events?date=YYYY-MM-DD
router.get('/', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'Missing date parameter' });

  try {
    const result = await db.query(
      'SELECT * FROM events WHERE date = $1 ORDER BY start_time',
      [date]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching events by date:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/events/month?year=YYYY&month=MM
router.get('/month', async (req, res) => {
  const { year, month } = req.query;
  if (!year || !month) return res.status(400).json({ error: 'Missing year or month' });

  try {
    const start = `${year}-${month.padStart(2, '0')}-01`;
    const end = new Date(year, parseInt(month), 0).toISOString().split('T')[0];

    const result = await db.query(
      'SELECT DISTINCT date FROM events WHERE date BETWEEN $1 AND $2',
      [start, end]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching monthly events:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/events/upcoming
router.get('/upcoming', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM events WHERE date >= CURRENT_DATE ORDER BY date, start_time LIMIT 10'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching upcoming events:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/events (create new event)
router.post('/', authenticateUser, async (req, res) => {
  const { title, description, date, start_time, end_time, location } = req.body;
  const userId = req.user.userId;

  if (!title || !date) {
    return res.status(400).json({ error: 'Title and date are required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO events (user_id, title, description, date, start_time, end_time, location)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userId, title, description, date, start_time, end_time, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

module.exports = router;
