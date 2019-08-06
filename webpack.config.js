const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        jquery: './app/assets/scripts/app-jquery.js',
        vanilla_js: './app/assets/scripts/app-vanilla_js.js'
    },
    output: {
        path: path.resolve(__dirname, './app/'),
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