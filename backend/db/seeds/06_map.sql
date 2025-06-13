INSERT INTO map (sale_id, event_id, location, address)
VALUES
(1, 1, ST_GeogFromText('POINT(-79.3871 43.6426)'), 'CN Tower, Toronto, ON'),
(2, 2, ST_GeogFromText('POINT(-123.1207 49.2827)'), 'Vancouver Art Gallery, Vancouver, BC');