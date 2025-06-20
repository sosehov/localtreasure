INSERT INTO events (user_id, title, description, address, start_time, end_time, date, is_active, category_id
, location
)
VALUES (
  1,
  'Spring Cleaning Sale!',
  'Useful items that will assist in things such as trimming your lawn or cleaning your car!',
  '750 Hornby St, Vancouver',
  '10:00:00',
  '14:00:00',
  '2025-06-15',
  TRUE,
  1,
  ST_MakePoint(-80.3200, 43.0250)::GEOGRAPHY
);
(
  2,
  'Outdoor Gear Trade!',
  'Slightly used camping, hiking and biking gears for trade or buy!',
  '1669 Johnston St, Vancouver',
  '09:00:00',
  '13:00:00',
  '2025-06-16',
  TRUE,
  2,
  ST_MakePoint(-123.1359, 49.2702)::GEOGRAPHY -- granville island
);
(
  3,
  'Book Lovers Bazaar',
  'Hundreds of books—novels, biographies, cookbooks and more. Grab a read for summer!',
  '318 Homer St (Suite 210), Vancouver',
  '08:00:00',
  '11:00:00',
  '2025-06-26',
  TRUE,
  2,
  ST_MakePoint(-123.1109, 49.2847)::GEOGRAPHY
)