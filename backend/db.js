// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',     // your MySQL host
  user: 'root',          // your MySQL username
  password: '1515',          // your MySQL password
  database: 'lost_and_found'  // your database name (make sure it exists)
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = connection;
