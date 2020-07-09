const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        jquery: './app/public/scripts/app-jquery.js',
        vanilla_js: './app/public/scripts/app-vanilla_js.js'
    },
    output: {
        path: path.resolve(__dirname, './app/public/scripts/tmp'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}