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
      paths.PATH_TESTS + '/coverage.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'coverage'],

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
      // *optional* babel options: isparta will use it as well as babel-loader
      babel: {
          presets: ['es2015', 'react']
      },
      // *optional* isparta options: istanbul behind isparta will use it
      isparta: {
          embedSource: true,
          noAutoWrap: true,
          // these babel options will be passed only to isparta and not to babel-loader
          babel: {
              presets: ['es2015', 'react']
          }
      },
      devtool: 'inline-source-map',
      resolve: webpackChips.RESOLVE,
      module: {
        preLoaders: [
          // transpile tests files
          {
            test: /\.jsx?$/,
            exclude: [
              /srcjs/,
              /node_modules/
            ],
            loader: 'babel'
          },
          // transpile and instrument only testing sources with isparta
          {
            test: /\.jsx?$/,
            include: [
              /srcjs/
            ],
            loader: 'isparta'
          }
        ]
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
    },
    coverageReporter: {
      type: 'text'
    }
  };

  cfg.preprocessors[paths.PATH_TESTS + '/coverage.js'] = ['webpack', 'sourcemap'];

  config.set(cfg);
};
