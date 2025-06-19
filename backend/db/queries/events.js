const db = require('../connection');


const getUserEvents = (userId) => {
    const query = {
        text: 'SELECT * FROM events where user_id = $1;',
        values: [userId]
    }

  return db.query(query)
    .then(data => {
      return data.rows;
    });
};


const createUserEvent = ({ user_id, title, description, date, start_time, end_time, address, category_id }) => {
    
    const query = {
        text: `INSERT INTO events ( user_id, title, description, date, start_time, end_time, address, category_id)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        values: [user_id, title, description, date, start_time, end_time, address, category_id]
    }

 return db.query(query)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      console.error('Error inserting event:', err);
      throw err;
    });
};

module.exports = { getUserEvents, createUserEvent };
