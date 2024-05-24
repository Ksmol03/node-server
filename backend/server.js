const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('App is listening on http://localhost:5000/')
})