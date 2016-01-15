var webpack = require('webpack');
var extend = require('extend');

var paths = require('./paths');
var webpackChips = require('./webpack.chips');

module.exports = function (config) {
  var cfg = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      paths.PATH_TESTS + '/tests.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      resolve: webpackChips.RESOLVE,
      module: {
        loaders: [webpackChips.LOADER_BABEL]
      },
      plugins: [
        new webpack.DefinePlugin(extend(webpackChips.DEFINE_PLUGIN, {
          'process.env.NODE_ENV': '"test"'
        }))
      ]
      // arusakov watch there does not affect anything
      // watch: true
    },
    webpackServer: {
      noInfo: true
    }
  };

  cfg.preprocessors[paths.PATH_TESTS + '/tests.js'] = ['webpack', 'sourcemap'];

  config.set(cfg);
};
