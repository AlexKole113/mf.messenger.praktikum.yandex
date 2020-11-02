const express       = require('express');
const serverless    = require('serverless-http');
const app           = express();
const router        = express.Router();
const fs            = require('fs');



let indexHtml = fs.readFileSync(`../index.html`).toString();



app.use(express.static('.'));
app.use('/.netlify/functions/server', router);
app.get('*', (req, res) => { res.send( indexHtml ) } );


module.exports = app;
module.exports.handler = serverless(app);