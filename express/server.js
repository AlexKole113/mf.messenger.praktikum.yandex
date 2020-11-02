const express       = require('express');
const serverless    = require('serverless-http');
const app           = express();
const router        = express.Router();

let indexHtml = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <script src="https://kit.fontawesome.com/1c7c26c897.js" crossorigin="anonymous"></script>
    
    
        <link rel="stylesheet" href="https://ya-messenger.netlify.app/static/pages/authorization/view/style/authorization.css">
        <link rel="stylesheet" href="https://ya-messenger.netlify.app/static/pages/registration/view/style/registration.css">
        <link rel="stylesheet" href="https://ya-messenger.netlify.app/static/pages/user-settings/view/style/user-settings.css">
        <link rel="stylesheet" href="https://ya-messenger.netlify.app/static/pages/users/view/style/users.css">
        <link rel="stylesheet" href="https://ya-messenger.netlify.app/static/pages/chat/view/style/chat.css">
        <link rel="stylesheet" href="https://ya-messenger.netlify.app/static/pages/404/view/style/error.css">
    
        <title>Title</title>
    </head>
    <body class="bg_dark-max">
    
        <!--   {{ page-template }}    -->
    
    <div class="mobile-wrapper"></div>
    
    <script type="module" src="https://ya-messenger.netlify.app/app.js"></script>
    <script src="https://ya-messenger.netlify.app/static/assets/js/mobile.js"></script>
    </body>
    </html>`;


app.use(express.static('.'));
app.use('/.netlify/functions/server', router);
app.get('*', (req, res) => { res.send( indexHtml ) } );


module.exports = app;
module.exports.handler = serverless(app);