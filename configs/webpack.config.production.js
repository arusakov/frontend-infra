var extend = require('extend');
var webpack = require('webpack');

var paths = require('./paths');
var baseConfig = require('./webpack.config.base');
var webpackChips = require('./webpack.chips');

module.exports = extend(baseConfig, {
  output: {
    path: paths.PATH_DIST,
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.DefinePlugin(extend(webpackChips.DEFINE_PLUGIN, {
      'process.env.NODE_ENV': '"production"'
    })),
    new webpack.optimize.UglifyJsPlugin()
  ]
});
