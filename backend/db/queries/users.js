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

const updateUser = (id, updates) => {
  const fields = [];
  const values = [];

  Object.entries(updates).forEach(([key, value], index) => {
    if (value !== undefined && value !== null) {
      fields.push(`${key} = $${index + 1}`);
      values.push(value);
    }
  });

  if (fields.length === 0) {
    return Promise.resolve();
  }

  const queryString = `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE id = $${fields.length + 1}
  `;

  values.push(id);

  return db.query(queryString, values);
};

module.exports = {
  getUsers,
  getCategories,
  getUserById,
  updateUser
};