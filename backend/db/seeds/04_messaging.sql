INSERT INTO messaging (sender_id, receiver_id, content, sendtime)
VALUES (
  1,
  2,
  'hello Michael, this is Alice',
  '2025-06-17T15:45:00.000Z'
),
(
  2, 
  1, 
  'hello Alice, this is Michael', 
  '2025-06-17T16:30:00.000Z'
),
(
  1, 
  3, 
  'hello David, this is Alice', 
  '2025-06-17T16:30:00.000Z'
),
(
  3, 
  1, 
  'hello Alice, this is David', 
  '2025-06-17T16:30:00.000Z'
),
(
  2, 
  3, 
  'hello David, this is Michael', 
  '2025-06-17T16:30:00.000Z'
),
(
  3, 
  2, 
  'hello Alice, this is David', 
  '2025-06-17T16:30:00.000Z'
);
