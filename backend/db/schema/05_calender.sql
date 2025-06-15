DROP TABLE IF EXISTS calender CASCADE;

CREATE TABLE calender (
  id SERIAL PRIMARY KEY NOT NULL, 
  event_id INT REFERENCES events(event_id),
  sale_id INT REFERENCES sales(id),
  user_id INT REFERENCES users(id),
  start_time TIMESTAMP NOT NULL,
  end_time  TIMESTAMP,
  title VARCHAR(255) NOT NULL
)
