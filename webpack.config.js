const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        app: './app/assets/scripts/app.js',
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