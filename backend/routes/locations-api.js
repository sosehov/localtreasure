const express = require('express');
const router = express.Router();
const db = require('../db');

//--------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, sale_id, event_id, ST_AsGeoJSON(location):: json AS location, address 
      FROM map;
      `);
      res.json(result.rows);
  } catch (err) {
    console.error('error in fetching locations:', err);
    res.status(500).json({ error: 'internal server error'})
  }
});

//--------------------------------------------------------------