const db = require('../connection');

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

const deleteUserSale = ( {saleId, user_id} ) => {
    const query = {
        text: 'DELETE FROM sales WHERE id = $1 AND user_id = $2',
        values: [saleId, user_id]
    }

  return db.query(query);
};


const createUserSale = ({ title, description, price, category_id, image_url, user_id }) => {
    
    const query = {
        text: `INSERT INTO sales ( title, description, price_cents, category_id, is_sold, image_url, user_id)
               VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        values: [title, description, price, category_id, false, image_url, user_id]
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

const getAllSales = () => {
  return db.query(`SELECT * FROM sales WHERE is_sold = FALSE ORDER BY id DESC;`)
    .then(res => res.rows);
};

const updateUserSale = ({ saleId, title, description, price, category_id, image_url, user_id, is_sold }) => {
  const query = {
    text: `UPDATE sales
           SET title = $1,
               description = $2,
               price_cents = $3,
               category_id = $4,
               image_url = $5,
               user_id = $6,
                is_sold = $8 
           WHERE id = $7`,
    values: [title, description, price, category_id, image_url, user_id, saleId, is_sold]
  };

  return db.query(query)
    .then(() => {
      return { success: true, saleId };
    })
    .catch((err) => {
      console.error('Error updating sale:', err);
      throw err;
    });
};

module.exports = { getUserSales, createUserSale, deleteUserSale, updateUserSale, getAllSales };