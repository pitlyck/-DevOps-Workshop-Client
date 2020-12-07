const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/env/backendurl', (req, res) => {
  const url = "tramtadadaaaa";//process.env.BACKEND_URL
  res.setHeader('Content-Type', 'text/plain');
  res.send(url);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);