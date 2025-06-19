const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getCategories = () => {
    const query = {
        text: 'SELECT * FROM categories',
    }
    
    return db.query(query)
    .then(data => {
        return data.rows;
    });
};

const getUserById = (user_id) => {
  const query_str = 'SELECT * FROM users WHERE id=$1';
  const query_args = [user_id];
  return db.query(query_str, query_args)
    .then(data => {
      return data.rows;
    });
};



module.exports = { getUsers, getCategories, getUserById};
