const express       = require('express');
const serverless    = require('serverless-http');
const path          = require('path');
const app           = express();
const router        = express.Router();
const fs            = require('fs');







app.use(express.static('.'));
let indexHtml = fs.readFileSync(`./index.html` ).toString();

app.use('/.netlify/functions/server', router);
app.get('*', (req, res) => { res.send( indexHtml ) } );


module.exports = app;
module.exports.handler = serverless(app);