const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/categories', (req, res) => {
    userQueries.getCategories()
    .then(categories => {
        res.json({ categories });
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/me', (req, res) => {
  const user_id = req.user?.user_id;

  if (!user_id) {
    return res.status(401).json({ error: 'Unauthorized: No user_id found in token' });
  }

  userQueries.getUserById(user_id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      console.error('Error in /me route:', err);
      res.status(500).json({ error: err.message });
    });
});

router.get('/:uid', (req, res) => {
  userQueries.getUserById(req.params.uid)
    .then(user => {
      res.json({ user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.put('/:id', async (req, res) => {
  const user_id = parseInt(req.params.id);
  const authUser_id = req.user.user_id;

  if (user_id !== authUser_id) {
    return res.status(403).json({ error: 'Forbidden: Cannot edit another user' });
  }

  const { name, bio, address, contact_info, avatar_url, password } = req.body;

  const fieldsToUpdate = {
    name,
    bio,
    address,
    contact_info,
    avatar_url,
    password
  };

  try {
    await userQueries.updateUser(user_id, fieldsToUpdate);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
