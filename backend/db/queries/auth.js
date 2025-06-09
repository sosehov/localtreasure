const db = require('../connection');

const getUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE email = $1', [email])
    .then(data => data.rows[0]);
};

const createUser = (name, email, password) => {
  const defaultAddress = 'N/A';
  const defaultBio = 'No bio yet';
  return db.query(
    'INSERT INTO users (name, email, password, address, bio) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, created_at',
    [name, email, password, defaultAddress, defaultBio]
  ).then(data => data.rows[0]);
};

module.exports = {
  getUserByEmail,
  createUser
};
