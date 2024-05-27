const express = require('express');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();


//Database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});

connection.end();


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
  });


//App is listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}/`)
})