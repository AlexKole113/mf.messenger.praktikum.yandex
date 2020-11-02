const express    = require('express');


const serverless = require('serverless-http');
const app        = express();
const router     = express.Router()


// const app = express();
const PORT = 3000;
// //const PORT = 80;
//
// app.use(express.static('.'));
app.listen(PORT, function () {
    console.log(`80 порт это пор по умолчанию для http, а текущий - ${PORT}!`);
});
//
// app.get('*', (req, res) => { res.sendFile(`${__dirname}/index.html`) })


router.get('*', (req, res) => { res.sendFile(`${__dirname}/index.html`) })
app.use('/.netlify/functions/api',router)

module.exports.handler = serverless(app)
