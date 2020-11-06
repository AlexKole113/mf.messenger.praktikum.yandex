const express          = require('express');
const serverless       = require('serverless-http');
const NetlifyindexHtml = require('netlify-index');
const app              = express();
const router           = express.Router();


app.use('/.netlify/functions/server', router);
app.get('*', (req, res) => { res.send( NetlifyindexHtml ) } );


module.exports = app;
module.exports.handler = serverless(app);