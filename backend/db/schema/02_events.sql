DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
  event_id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  address VARCHAR(255),
  start_time TIME,
  end_time TIME,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  location GEOGRAPHY(POINT),
  is_active BOOLEAN DEFAULT TRUE,
  category_id INTEGER REFERENCES categories(id)
);