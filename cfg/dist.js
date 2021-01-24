'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
<<<<<<< HEAD
    entry: path.join(__dirname, '../src/index'),
    cache: false,
    devtool: 'sourcemap',
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new BowerWebpackPlugin({
            searchResolveModulesDirectories: true
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: defaultSettings.getDefaultModules()
=======
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: true
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
>>>>>>> 54da43cda7bbcc34d8350a5d7ef65d904bc75acb
});

// Add needed loaders to the defaults here
config.module.loaders.push({
<<<<<<< HEAD
    test: /\.(js|jsx)$/,
    loader: 'babel',
    include: [].concat(
        config.additionalPaths, [path.join(__dirname, '/../src')]
    )
});

module.exports = config;
=======
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
>>>>>>> 54da43cda7bbcc34d8350a5d7ef65d904bc75acb
