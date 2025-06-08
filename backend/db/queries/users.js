const db = require('../connection');
const { v4: uuidv4 } = require('uuid');


const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};


const getUserSales = (userId) => {
    const query = {
        text: 'SELECT * FROM sales where user_id = $1;',
        values: [userId]
    }

  return db.query(query)
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



const createUserSale = ({ title, description, price, category_id, photo_url, user_id }) => {

    const saleId = uuidv4();
    
    const query = {
        text: `INSERT INTO sales (id, title, description, price, category_id, is_sold, photo_id, user_id)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        values: [saleId, title, description, price, category_id, false, photo_url, user_id]
    }

 return db.query(query)
    .then(() => {
      return { success: true, saleId };
    })
    .catch((err) => {
      console.error('Error inserting sale:', err);
      throw err;
    });
};

module.exports = { getUsers, getUserSales, createUserSale, getCategories };
