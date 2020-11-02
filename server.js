//const express = require('express');
//
// const app = express();
//const PORT = 4000;
// app.listen(PORT, function () {
//     console.log(`80 порт это пор по умолчанию для http, а текущий - ${PORT}!`);
// });


const app   = require('./express/server');
const PORT  = 80;
app.listen( PORT, () => console.log(`Local app listening on port ${PORT}!`));
//app.get('*', (req, res) => { res.sendFile(`${__dirname}/index.html`) })