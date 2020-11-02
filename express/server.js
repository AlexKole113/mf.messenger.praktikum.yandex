const express       = require('express');
const path          = require('path');
const serverless    = require('serverless-http');
const app           = express();

app.use(express.static('.'));

const router = express.Router();
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);