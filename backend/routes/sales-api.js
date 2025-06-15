const express = require('express');
const router  = express.Router();
const salesQueries = require('../db/queries/sales');

router.get('/sales', (req, res) => {
  salesQueries.getUserSales(req.query.user)
    .then(sales => {
      res.json({ sales });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/createSale', async  (req, res) => {
  const { title, description, price, category_id, image_url, userId } = req.body;

  if (!title || !price || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

 try {
    const result = await salesQueries.createUserSale({ title, description, price, category_id, image_url, userId });
    res.status(201).json({ message: 'Sale created', saleId: result.saleId });
  } catch (err) {
    res.status(500).json({ error: 'Database insert failed' });
  }
});

router.delete('/deleteSale', async (req, res) => {
  const { saleId, userId } = req.body;
  console.log('DELETE request received:', { saleId, userId });

  if (!saleId || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await salesQueries.deleteUserSale({ saleId, userId });

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
  const { id, title, description, price, category_id, image_url, userId, is_sold } = req.body;

  if (!title || !price || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

 try {
    const result = await salesQueries.updateUserSale({ saleId:id, title, description, price, category_id, image_url, userId, is_sold });
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