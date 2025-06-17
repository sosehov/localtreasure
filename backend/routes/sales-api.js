const express = require('express');
const router  = express.Router();
const salesQueries = require('../db/queries/sales');
const { authenticateUser } = require('../middleware/auth');

router.get('/sales', authenticateUser, (req, res) => {
  const user_id = req.user.user_id;

  salesQueries.getUserSales(user_id)
    .then(sales => {
      res.json({ sales });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/createSale', authenticateUser, async  (req, res) => {
  const { title, description, price, category_id, image_url } = req.body;
  const user_id = req.user.user_id;

  if (!title || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

 try {
    const result = await salesQueries.createUserSale({ title, description, price, category_id, image_url, user_id });
    res.status(201).json({ message: 'Sale created', saleId: result.saleId });
  } catch (err) {
    res.status(500).json({ error: 'Database insert failed' });
  }
});

router.delete('/deleteSale', authenticateUser, async (req, res) => {
  const { saleId } = req.body;
  const user_id = req.user.user_id;

  console.log('DELETE request received:', { saleId, user_id });

  if (!saleId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await salesQueries.deleteUserSale({ saleId, user_id});

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Sale not found or not authorized' });
    }

    res.status(200).json({ message: 'Sale deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database delete failed' });
  }
});

router.post('/updateSale', authenticateUser, async  (req, res) => {
  const { id, title, description, price, category_id, image_url, is_sold } = req.body;
  const user_id = req.user.user_id;

  if (!title || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

 try {
    const result = await salesQueries.updateUserSale({ saleId: id, title, description, price, category_id, image_url, user_id, is_sold });
    res.status(201).json({ message: 'Sale updated', saleId: result });
  } catch (err) {
    res.status(500).json({ error: 'Database insert failed' });
  }
});

router.get('/allSales', (req, res) => {
  salesQueries.getAllSales()
    .then(sales => {
      res.json({ sales });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;