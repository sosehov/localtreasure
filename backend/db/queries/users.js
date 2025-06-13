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



module.exports = { getUsers, getCategories};
