const express = require('express');
fs = require('fs');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3000

let rawdata = fs.readFileSync(__dirname + '/data/store.js');
let stores = JSON.parse(rawdata);

app.use(express.static('media'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/store/:id', (req, res) => {

  let storeId =  parseInt(req.params['id']);

  let store = stores.find(s => s.id == storeId);

  let html_template_buffer = fs.readFileSync(__dirname + '/media/html/index.html');
  let html_template_string = html_template_buffer.toString();

  html_template_string = html_template_string.replaceAll(/{name}/g, store.name);
  html_template_string = html_template_string.replace(/{basePrice}/g, store.basePrice);
  html_template_string = html_template_string.replace(/{quantity}/g, store.quantity);
  html_template_string = html_template_string.replace(/{content}/g, store.content);
  html_template_string = html_template_string.replace(/{image}/g, store.image);

  // fs.readFile(someFile, 'utf8', function (err, data) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   data = data.replace(/string to be replaced/g, 'replacement');
  
  //   fs.writeFile(someFile, result, 'utf8', function (err) {
  //      if (err) return console.log(err);
  //   });
  // });

    res.send(html_template_string);

    //res.sendFile(html_template);

    //res.sendFile(__dirname + '/media/html/index.html');
})

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/media/html/index.html');
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})