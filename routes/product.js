const express = require('express');
const router = express.Router();
const db = require('../models/product.js');

// Get all products
router.get('/all', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a product by ID
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(row);
  });
});

// Create a new product
router.post('/', (req, res) => {
  const { name, price, client_id } = req.body;
  db.run('INSERT INTO products (name, price, client_id) VALUES (?, ?, ?)', [name, price, client_id], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success" });
  });
});

// Update a product by ID
router.put('/:id', (req, res) => {
  const { name, price, client_id } = req.body;
  db.run('UPDATE products SET name = ?, price = ?, client_id = ? WHERE id = ?', [name, price, client_id, req.params.id], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success" });
  });
});

// Delete a product by ID
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success" });
  });
});

module.exports = router;
