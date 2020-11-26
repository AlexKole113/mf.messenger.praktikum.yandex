//const path = require('path');
const miniCss = require('mini-css-extract-plugin');
module.exports = {
    entry: './src-app.js',
    output: {
        filename: 'app.js'
    },
   // watch: true,
    module: {
        rules: [{
            test:/\.(s*)css$/,
            use: [
                miniCss.loader,
                'css-loader',
                'sass-loader',
            ]
        },
        {
            test: /\.html$/,
            use: 'html-loader'
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }

        ]
    },
    plugins: [
        new miniCss({
            filename: 'style.css',
        }),
    ]
}