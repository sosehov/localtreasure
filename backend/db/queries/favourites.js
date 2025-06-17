const db = require('../connection');

const getFavourites = (userId) => {
  const query_str = 'SELECT sales.* FROM sales JOIN favourites ON sales.id = favourites.sale_id WHERE favourites.consumer_id = $1';
  const query_args = [userId];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
};

const addFavourite = (userId, itemId) => {
  const query_str = 'INSERT INTO favourites(consumer_id, item_id) VALUES ($1, $2)';
  const query_args = [userId, itemId];
  return db.query(query_str, query_args)
  .then(data => {
    return data.rows;
  });
}

module.exports = { getFavourites, addFavourite };