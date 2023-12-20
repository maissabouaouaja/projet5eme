const express = require('express');
const router = express.Router();
const db = require('../models/models.js');

//get all clients
router.get('/all', (req, res) => {
  db.all(`SELECT * FROM clients`, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a client by ID
router.get('/:id', (req, res) => {
  db.get(`SELECT * FROM clients WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(row);
  });
});

// Create a new client
router.post('/', (req, res) => {
  const { name, balance } = req.body;
  db.run(`INSERT INTO clients (name, balance) VALUES (?, ?)`, [name, balance], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success" });
  });
});

// Update a client by ID
router.put('/:id', (req, res) => {
  const { name, balance } = req.body;
  db.run(`UPDATE clients SET name = ?, balance = ? WHERE id = ?`, [name, balance, req.params.id], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success" });
  });
});

// Delete a client by ID
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM clients WHERE id = ?`, [req.params.id], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success" });
  });
});

module.exports = router;
