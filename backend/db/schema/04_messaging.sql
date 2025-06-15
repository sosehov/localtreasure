DROP TABLE IF EXISTS messaging CASCADE;

CREATE TABLE messaging (
  msg_id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id),
  receiver_id INTEGER REFERENCES users(id),
  content TEXT,
  sendtime BIGINT
);