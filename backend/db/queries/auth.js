const db = require('../connection');

const getUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE email = $1', [email])
    .then(data => data.rows[0]);
};

const createUser = (name, email, password) => {
  return db.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
    [name, email, password]
  ).then(data => data.rows[0]);
};

module.exports = {
  getUserByEmail,
  createUser
};
