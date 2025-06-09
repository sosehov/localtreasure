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
  const { title, description, price, category_id, photo_url, user_id } = req.body;

  if (!title || !price || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

 try {
    const result = await userQueries.createUserSale({ title, description, price, category_id, photo_url, user_id });
    res.status(201).json({ message: 'Sale created', saleId: result.saleId });
  } catch (err) {
    res.status(500).json({ error: 'Database insert failed' });
  }
});

router.delete('/deleteSale', async (req, res) => {
  const { saleId, user_id } = req.body;
  console.log('DELETE request received:', { saleId, user_id }); 

  if (!saleId || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await userQueries.deleteUserSale({ saleId, user_id });

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Sale not found or not authorized' });
    }

    res.status(200).json({ message: 'Sale deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database delete failed' });
  }
});

router.post('/updateSale', async  (req, res) => {
  const { id, title, description, price, category_id, photo_id, user_id, is_sold } = req.body;

  if (!title || !price || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

 try {
    const result = await userQueries.updateUserSale({ saleId:id, title, description, price, category_id, photo_id, user_id, is_sold });
    res.status(201).json({ message: 'Sale updated', saleId: result });
  } catch (err) {
    res.status(500).json({ error: 'Database insert failed' });
  }
});

module.exports = router;
