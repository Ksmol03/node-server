const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/hello', (req, res) => {
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString();
    res.json({ message: formattedTime});
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}/`)
})