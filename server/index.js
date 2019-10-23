const fs = require('fs');
const path = require('path');

const express = require('express');

const {PORT} = process.env;
const app = express();

const indexHtml = fs.readFileSync(path.resolve('./build-live/index.html'), 'utf8');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const router = express.Router();

router.use(['^/$', '^/auth/?$', '^/manager/?$'], (req, res) => {
  res.send(indexHtml);
});

router.use(
  express.static(path.resolve(__dirname, '..', 'build-live'), {maxAge: '30d'})
);

app.use(router);

if(!PORT){
  console.error('PORT VARIABLE NOT SET!');
  return;
}

app.listen(PORT, '127.0.0.1', () => {
  console.log(`SSR running on port ${PORT}`);
});