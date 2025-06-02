const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  // Check if user exists
  const checkQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkQuery, [username], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      // User not found — auto-register
      const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(insertQuery, [username, password], (err2, insertResult) => {
        if (err2) {
          console.error('DB error:', err2);
          return res.status(500).json({ message: 'Database error during registration' });
        }
        // Return new user info
        return res.json({
          message: 'User registered and logged in',
          user: { id: insertResult.insertId, username }
        });
      });
    } else {
      // User found — verify password
      if (results[0].password === password) {
        return res.json({
          message: 'Login successful',
          user: { id: results[0].id, username: results[0].username }
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  });
});

module.exports = router;
