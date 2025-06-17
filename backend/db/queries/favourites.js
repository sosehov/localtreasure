const db = require('../connection');

const getFavourites = (userId) => {
  const query_str = 'SELECT * FROM favourites WHERE (user_id = $1) LEFT JOIN SELECT * FROM sales';
  const query_args = [userId];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
};

const addFavourite = (item) => {
  const query_str = 'INSERT INTO favourites(user_id, item_id) VALUES ($1, $2)';
  const query_args = [item.userId, item.itemId];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
}

module.exports = { getFavourites, addFavourite };