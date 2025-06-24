const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { authenticateUser } = require('../middleware/auth');
const { geocodeAddress } = require('../utils/geocode');

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
  const { title, description, date, start_time, end_time, address } = req.body;
  const user_id = req.user.user_id;

  if (!title || !date || !address) {
    return res.status(400).json({ error: 'Title, date, and address are required' });
  }

  console.log("📍 Geocoding address:", address);
  const geo = await geocodeAddress(address);
  console.log("📌 Geocode result:", geo);

  if (!geo) {
    return res.status(400).json({ error: 'Incorrect address' });
  }
    try {
      const result = await db.query(`
      INSERT INTO events (user_id, title, description, date, start_time, end_time, address)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING event_id`,
        [user_id, title, description, date, start_time, end_time, address]
      );

      const event_id = result.rows[0].event_id;
      const point = `POINT(${geo.lon} ${geo.lat})`;

      await db.query(`
      INSERT INTO map (event_id, location, address)
      VALUES ($1, ST_GeogFromText($2), $3)`,
        [event_id, point, address]
      );

      res.status(201).json({ message: 'Event and location created', event_id });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Database insert failed' });
    }
  });

module.exports = router;
