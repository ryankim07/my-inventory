var path = require('path');
var webpack = require('webpack');
var BUILD_DIR = path.resolve(__dirname, 'web');
var APP_DIR = path.resolve(__dirname, 'react');

var config = {
    entry: [
        APP_DIR + '/index.js',
    ],
    output: {
        path: BUILD_DIR,
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [
            {
                test: /^(?!.*(hot)).*/,
                include : APP_DIR,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'react']
                }
            },
			{
				test: /\.css$/,
				include: /node_modules/,
				loaders: ['style-loader', 'css-loader']
			},
			{   test: /.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
			},
		]
    },
    // Recognize extensions when importing separate components
    resolve: {
        extensions: ['.js', '.jsx', '.css']
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