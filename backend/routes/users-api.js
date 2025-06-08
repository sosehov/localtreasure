/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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


router.get('/sales', (req, res) => {
    console.log(req)
  userQueries.getUserSales(req.query.user)
    .then(sales => {
      res.json({ sales });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/categories', (req, res) => {
    console.log(req)
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

router.post('/createSale', async  (req, res) => {
  console.log(req.body)
  const { title, description, price, category_id, photo_url, user_id } = req.body;

  if (!title || !price || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

 try {
    console.log('inserting')
    const result = await userQueries.createUserSale({ title, description, price, category_id, photo_url, user_id });
    res.status(201).json({ message: 'Sale created', saleId: result.saleId });
  } catch (err) {
    res.status(500).json({ error: 'Database insert failed' });
  }
});

module.exports = router;
