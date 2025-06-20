INSERT INTO map (sale_id, event_id, location, address)
VALUES
(1, 1, ST_GeogFromText('POINT(-123.1207 49.2827)'), 'Vancouver Art Gallery, Vancouver, BC'),
(2, 2, ST_GeogFromText('POINT(-123.1343 49.2695)'), 'Granville island Vancouver, BC');


-- INSERT INTO map (sale_id, event_id, address)
-- VALUES
-- (1, 1, 'CN Tower, Toronto, ON'),
-- (2, 2, 'Vancouver Art Gallery, Vancouver, BC');