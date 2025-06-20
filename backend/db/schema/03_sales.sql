DROP TABLE IF EXISTS sales CASCADE;

CREATE TABLE sales (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description VARCHAR(255),
  price_cents DECIMAL,
  category_id INTEGER REFERENCES categories(id),
  is_sold BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(255)
);