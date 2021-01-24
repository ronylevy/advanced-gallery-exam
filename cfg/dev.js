'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
<<<<<<< HEAD
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    cache: true,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new BowerWebpackPlugin({
            searchResolveModulesDirectories: false
        })
    ],
    module: defaultSettings.getDefaultModules()
=======
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules()
>>>>>>> 54da43cda7bbcc34d8350a5d7ef65d904bc75acb
});

// Add needed loaders to the defaults here
config.module.loaders.push({
<<<<<<< HEAD
    test: /\.(js|jsx)$/,
    loader: 'react-hot!babel-loader',
    include: [].concat(
        config.additionalPaths, [path.join(__dirname, '/../src')]
    )
});

module.exports = config;
=======
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
>>>>>>> 54da43cda7bbcc34d8350a5d7ef65d904bc75acb
