const express       = require("express");
const serverless    = require("serverless-http");
const app           = express();
const router        = express.Router();


app.get('/', (req, res) => { res.sendFile(`${__dirname}/index.html`) })
app.use('/.netlify/functions/api', router )


module.exports.handler = serverless(app);