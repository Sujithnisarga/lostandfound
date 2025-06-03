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
  const { query, location } = req.query; // frontend sends "query" not "item_name"

  let sql = `SELECT * FROM items WHERE type = 'lost'`;
  const params = [];

  if (query) {
    sql += ` AND item_name LIKE ?`;
    params.push(`%${query}%`);
  }
  if (location) {
    sql += ` AND location LIKE ?`;
    params.push(`%${location}%`);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    // Send response in expected format
    res.json({ items: results });
  });
});

module.exports = router;
