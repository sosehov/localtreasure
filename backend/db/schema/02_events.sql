-- Don't forget to add postGIS query here!

DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
  event_id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  title TEXT NOT NULL,
  description TEXT,
  address VARCHAR(255),
  start_time TIME,
  end_time TIME,
  -- location GEOGRAPHY()
  is_active BOOLEAN DEFAULT TRUE,
  category_id INT,

  

)