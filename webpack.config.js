var path = require('path');
var webpack = require('webpack');
var BUILD_DIR = path.resolve(__dirname, 'web');
var APP_DIR = path.resolve(__dirname, 'react');

var config = {
    entry: [
        APP_DIR + '/app.js',
    ],
    output: {
        path: BUILD_DIR,
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include : APP_DIR,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }]
    },
    // Recognize extensions when importing separate components
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    // Only used in VM because reloading is really slow
    watchOptions: {
        poll: true
    }
};

module.exports = config;