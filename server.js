const express   = require('express');
const app       = express();
const PORT      = 80;


app.use(express.static('.'));
app.listen( PORT, () => console.log( `Local app listening on port ${PORT}!` ));
app.get('*', (req, res) => { res.sendFile(`${__dirname}/index.html`) })

