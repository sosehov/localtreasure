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

module.exports = router;
