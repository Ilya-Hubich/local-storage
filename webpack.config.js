const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    context: __dirname,
    entry: {
        'local-storage': './local-storage'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{loader: 'babel-loader', options: {presets: ['es2015']}}]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./dist'], {root: process.cwd()}),
        new WebpackNotifierPlugin({title: 'Local storage', alwaysNotify: true}),
    ],
    devtool: 'source-map'
};
