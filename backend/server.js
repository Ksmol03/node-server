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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}/`)
})