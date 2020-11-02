const express       = require('express');
const path          = require('path');
const serverless    = require('serverless-http');
const app           = express();


const router = express.Router();
//app.use(express.static('.'));
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));


module.exports = app;
module.exports.handler = serverless(app);