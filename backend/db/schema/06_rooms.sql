DROP TABLE IF EXISTS rooms CASCADE;
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id),
  receiver_id INTEGER REFERENCES users(id),
  create_time TIMESTAMP
);