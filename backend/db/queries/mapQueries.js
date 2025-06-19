const db = require('../connection');

const getAllLocations = () => {
  const query = `
  SELECT
    id,
    sale_id,
    event_id,
    ST_X(location::geometry) as longitude,
    ST_Y(location::geometry) as latitude,
    address
  FROM map
  ORDER BY id;
  `;

  return db.query(query);
}

module.exports = { getAllLocations }
