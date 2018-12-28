var env = process.env.node_env;
var webpack = require('webpack');
var path = require('path');
var miniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: {
        app: ['./src/index.js', './src/assets/sass/test.scss']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: env === 'development' ? '[name].js' : '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.(jpg|jpeg|png|gif|ico)$/,
                loader: 'file-loader',
                options:{
                    name: '[name].[ext]',
                    outputPath: 'images'
                }
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: env === 'development' ? '[name].css' : '[name].min.css'
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: env === 'production'
        })
    ]
};

