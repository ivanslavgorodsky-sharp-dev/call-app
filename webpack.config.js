const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        bundle: ['babel-polyfill', './src/bundle.js'],
        login: ['babel-polyfill', './src/login.js'],
        register: ['babel-polyfill', './src/register.js'],
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: "[name].js"
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { 
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }  
        ]
    }
}
