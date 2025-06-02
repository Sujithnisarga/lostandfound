// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db'); // MySQL connection (we'll create this file)
const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
