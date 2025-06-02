// routes/items.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Report lost or found item
router.post('/report', (req, res) => {
  const { user_id, item_name, description, date, location, type } = req.body;

  if (!['lost', 'found'].includes(type)) {
    return res.status(400).json({ message: 'Invalid item type' });
  }

  const query = `INSERT INTO items (user_id, item_name, description, date, location, type) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [user_id, item_name, description, date, location, type], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} item reported successfully.` });
  });
});

// Search lost items
router.get('/search', (req, res) => {
  const { item_name, location } = req.query;

  let query = `SELECT * FROM items WHERE type = 'lost'`;
  const params = [];

  if (item_name) {
    query += ` AND item_name LIKE ?`;
    params.push(`%${item_name}%`);
  }
  if (location) {
    query += ` AND location LIKE ?`;
    params.push(`%${location}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

module.exports = router;
