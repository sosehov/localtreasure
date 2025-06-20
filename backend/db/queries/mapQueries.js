const db = require('../db/connection');

const getAllLocations = () => {
  const query = `
  SELECT
    id,
    sale_id,
    event_id,
    ST_AsGeoJSON(location) as location,
    address
  FROM map
  ORDER BY id;
  `;

  return db.query(query);
}

module.exports = { getAllLocations }
