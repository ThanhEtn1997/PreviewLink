const express = require('express');
fs = require('fs');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('media'));

// app.use('/static', express.static(path.join(__dirname, 'media')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/media/html/index.html');
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})