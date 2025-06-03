Directory Structure
lost-and-found/
├── backend/
│   ├── db.js                # MySQL DB connection
│   ├── server.js            # Express app
│   └── routes/
│       ├── auth.js          # Login route
│       └── items.js         # Report/search item routes
├── frontend/
│   ├── index.html           # Login page
│   ├── dashboard.html       # After login
│   ├── report.html          # Report lost/found
│   ├── search.html          # Search items
│   ├── css/
│   │   └── styles.css       # Bluish themed CSS
│   └── js/
│       ├── login.js
│       ├── report.js
│       └── search.js
├── README.md
Database
CREATE DATABASE lost_found;

USE lost_found;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE,
  location VARCHAR(255),
  type ENUM('lost', 'found') NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
