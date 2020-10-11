const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.static('./static'));

app.listen(PORT, function () {
    console.log(`80 порт это пор по умолчанию для http, а текущий - ${PORT}!`);
});