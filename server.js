const express = require('express');

const app = express();
const PORT = 4000;
//const PORT = 80;

app.use(express.static('.'));
app.listen(PORT, function () {
    console.log(`80 порт это пор по умолчанию для http, а текущий - ${PORT}!`);
});

app.get('*', (req, res) => { res.sendFile(`${__dirname}/index.html`) })