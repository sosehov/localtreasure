const db = require("../connection");

const getUserEvents = (userId) => {
  const query = {
    text: "SELECT * FROM events where user_id = $1;",
    values: [userId],
  };

  return db.query(query).then((data) => {
    return data.rows;
  });
};

const createUserEvent = ({
  user_id,
  title,
  description,
  date,
  start_time,
  end_time,
  address,
  category_id,
}) => {
  const query = {
    text: `INSERT INTO events ( user_id, title, description, date, start_time, end_time, address, category_id)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: [
      user_id,
      title,
      description,
      date,
      start_time,
      end_time,
      address,
      category_id,
    ],
  };

  return db
    .query(query)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      console.error("Error inserting event:", err);
      throw err;
    });
};

const getAllEvents = () => {
  return db
    .query(
      `SELECT events.*, users.name FROM events INNER JOIN users ON events.user_id = users.id WHERE events.date >= CURRENT_DATE ORDER BY id DESC;`,
    )
    .then((res) => res.rows);
};

const deleteUserEvent = ({ eventId, user_id }) => {
  const query = {
    text: "DELETE FROM events WHERE event_id = $1 AND user_id = $2",
    values: [eventId, user_id],
  };

  return db.query(query);
};

const updateUserEvent = ({
  event_id,
  user_id,
  title,
  description,
  date,
  start_time,
  end_time,
  address,
  category_id,
}) => {
  const query = {
    text: `UPDATE events
           SET title = $1,
               description = $2,
               date = $3,
               start_time = $4,
               end_time = $5,
               address = $6,
               category_id = $7,
               user_id = $8
           WHERE event_id = $9`,
    values: [
      title,
      description,
      date,
      start_time,
      end_time,
      address,
      category_id,
      user_id,
      event_id,
    ],
  };

  return db
    .query(query)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      console.error("Error updating event:", err);
      throw err;
    });
};

module.exports = {
  getUserEvents,
  createUserEvent,
  getAllEvents,
  deleteUserEvent,
  updateUserEvent,
};
