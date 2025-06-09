DROP TABLE IF EXISTS sales CASCADE;

CREATE TABLE sales (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description VARCHAR(255),
  price_cents, INTEGER NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  is_sold BOOLEAN DEFAULT FALSE,
  photo_url VARCHAR(255),
);