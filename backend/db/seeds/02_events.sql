INSERT INTO events (user_id, title, description, address, start_time, end_time, is_active, category_id
-- , location
)
VALUES (
  1,
  'Spring Cleaning Sale!',
  'Useful items that will assist in things such as trimming your lawn or cleaning your car!',
  '123 Mapletree Lane',
  '2025-06-15 10:00:00',
  '2025-06-15 14:00:00',
  TRUE,
  1
  -- ST_MakePoint(-80.3200, 43.0250)::GEOGRAPHY
);

INSERT INTO events (user_id, title, description, address, start_time, end_time, is_active, category_id
-- , location
)
VALUES (
  2,
  'Outdoor Gear Trade!',
  'Slightly used camping, hiking and biking gears for trade or buy!',
  'Granville Island Park, Vancouver, BC',
  '09:00:00',
  '13:00:00',
  TRUE,
  2
  -- ST_MakePoint(-123.1359, 49.2702)::GEOGRAPHY -- granville island
);