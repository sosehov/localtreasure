DROP TABLE IF EXISTS map CASCADE;

CREATE TABLE map (
  id SERIAL PRIMARY KEY NOT NULL,
  sale_id INTEGER REFERENCES sales(id),
  event_id INTEGER REFERENCES events(event_id),
  -- location GEOGRAPHY(POINT) NOT NULL,
  address TEXT
);