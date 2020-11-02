//const express = require('express');
//
// const app = express();
//const PORT = 4000;
const PORT = 80;
//

// app.listen(PORT, function () {
//     console.log(`80 порт это пор по умолчанию для http, а текущий - ${PORT}!`);
// });


const app = require('./express/server');

app.listen( PORT, () => console.log('Local app listening on port 3000!'));
app.get('*', (req, res) => { res.sendFile(`${__dirname}/index.html`) })