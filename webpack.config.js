const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // Entry point for your application
    entry: './src/index.js',

    // Output configuration for Webpack
    output: {
        path: path.resolve(__dirname, 'build'), // Changed to 'build' to align with npm build convention
        filename: 'popup_bundle.js',
    },

    // Module rules for processing different file types
    module: {
        rules: [
            {
                test: /\.js$/, // JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Using babel-loader to transpile ES6+
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Presets for React and modern JavaScript
                    },
                },
            },
            {
                test: /\.css$/, // CSS files
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extract CSS into separate files
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // Image files
                type: 'asset/resource',
            },
        ],
    },

    // Plugins configuration
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Ensure this matches your actual popup HTML file
            filename: 'index.html', // Output file name
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/manifest.json', to: 'manifest.json' }, // Copy manifest.json to build directory
                // Specify patterns for any additional assets you need to copy
                { from: 'public/icons', to: 'icons' }, // Example: Copying icons directory
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css', // Output CSS file name
        }),
    ],

    // Development tools configuration
    devtool: 'cheap-module-source-map', // Source mapping for easier debugging
    mode: 'development', // Set mode to 'production' when building for production
};
