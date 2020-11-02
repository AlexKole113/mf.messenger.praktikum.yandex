const express       = require("express");
const serverless    = require("serverless-http");
const app           = express();
const router        = express.Router();


app.use('/.netlify/functions/api', router )


app.use(express.static('.'));
app.get('*', (req, res) => { res.sendFile(`${__dirname}/index.html`) })



module.exports.handler = serverless(app);