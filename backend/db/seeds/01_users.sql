INSERT INTO users (name, email, address, password, bio, is_admin, contact_info, location)
VALUES (
  'Alice Henderson',
  'AliceH@gmail.com',
  '750 Hornby St, Vancouver, BC V6Z 2H7',
  'ilovetogarden123',
  'I am an avid gardener, tending to my flowerbeds and growing different kinds of vegatables! I also enjoy watching soap operas, Days of Our Lives is my favourite!',
  true,
  '123-654-7890',
  ST_MakePoint(-123.120464, 49.2828)::GEOGRAPHY -- Art gallery BC
),
(
  'Michael Lee',
  'LeeM@gmail.com',
  '1669 Johnston St, Vancouver, BC V6H 3R9',
  'traveler5000',
  'I love to travel to different countries around the world! I also enjoy doing hikes',
  true,
  '789-635-1471',
  ST_MakePoint(-123.1343, 49.2695)::GEOGRAPHY --Granville island Vancouver, BC roughly
),
(
  'David Sutton',
  'SuttonD@gmail.com',
  '318 Homer St (Suite 210), Vancouver, BC V6B 2V2',
  'RandomDude',
  'I love to do nothing',
  false,
  '789-635-1461',
  ST_MakePoint(-123.1109, 49.2847)::GEOGRAPHY --Gastown Vancouver BC roughly
);
