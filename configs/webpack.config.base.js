var paths = require('./paths');
var webpackChips = require('./webpack.chips');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: paths.PATH_ENTRY
  },
  resolve: webpackChips.RESOLVE,
  module: {
    loaders: [webpackChips.LOADER_BABEL]
  }
};
