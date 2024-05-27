const express = require('express');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Adjust based on your needs
    queueLimit: 0
});


//APIs
app.get('/api/data', (req, res) => {
    pool.query('SELECT * FROM posts;', (error, results) => {
        if (error) {
            console.error('Error executing query:', error.stack);
            return;
        }
        console.log('Got data!');
        res.json(results);
    });
})

app.post('/api/data', (req, res) => {
    const { author, title, textContent, priority, postDate } = req.body;
    const query = 'INSERT INTO posts (author, title, text_content, priority, post_date) VALUES (?, ?, ?, ?, ?)';
    pool.query(query, [author, title, textContent, priority, postDate], (error, result) => {
        if (error) {
            return res.status(500).json({message: error.message});
        } else {
            res.status(201).json({ message: 'User added successfully', userId: result.insertId });
        }
    })
})


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
  });


//App is listening
app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}/`)
})