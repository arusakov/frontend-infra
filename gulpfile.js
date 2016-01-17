var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var gulp = require('gulp');
var gutil = require('gutil');
var gAutoprefixer = require('gulp-autoprefixer');
var gReplace = require('gulp-replace');
var gTslint = require('gulp-tslint');
var gMinifyCss = require('gulp-minify-css');
var gRename = require('gulp-rename');
var gSass = require('gulp-sass');
var gSourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');
var KarmaServer = require('karma').Server;
var extend = require('extend');
var del = require('del');

var paths = require('./configs/paths');

// build for production (web)
// todo arusakov test task
gulp.task('default', ['webpack', 'css', 'tslint', 'html'], () => {
  console.log('Build Web OK!');
});

// webpack and sass in watch mode
gulp.task('dev', ['tsc', 'css:dev'], () => {
  gulp.watch(paths.PATH_STYLES + '/**/*.scss', ['css:dev']);
  createWebpackTask(paths.PATH_CONF_WEBPACK_DEV, {
    watch: true
  })();
});

gulp.task('tsc', ['clear:srcjs'], createTypeScriptTask(paths.PATH_SRC_TS, false));
gulp.task('tsc:watch', ['clear:srcjs'], createTypeScriptTask(paths.PATH_SRC_TS, true));

gulp.task('webpack', ['clear:dist', 'tsc'], createWebpackTask(paths.PATH_CONF_WEBPACK_PRODUCTION));

gulp.task('test', ['tsc'], (done) => {
  new KarmaServer({configFile: paths.PATH_CONF_KARMA}, () => {
    done()
  }).start();
});

// junit reports for jenkins
gulp.task('test:junit', ['tsc'], createKarmaTask({
  autoWatch: false,
  colors: false,
  configFile: paths.PATH_CONF_KARMA_COVER,
  reporters: ['dots', 'junit', 'coverage'],
  junitReporter: {
    outputDir: paths.PATH_PROJECT_ROOT, // results will be saved as $outputDir/$browserName.xml
    outputFile: 'report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
    suite: 'Frontend', // suite will become the package name attribute in xml testsuite element
    useBrowserName: false // add browser name to report and classes names
  },
  coverageReporter: {
    type: 'cobertura', // for Jenkins
    includeAllSources: true,
    dir: paths.PATH_PROJECT_ROOT,
    subdir: '.',
    file: 'coverage.xml'
  }
}));

// code coverage
gulp.task('coverage', ['tsc'], createKarmaTask({
  autoWatch: false,
  configFile: paths.PATH_CONF_KARMA_COVER
}));

gulp.task('coverage:html', ['tsc'], createKarmaTask({
  autoWatch: false,
  configFile: paths.PATH_CONF_KARMA_COVER,
  coverageReporter: {
    type : 'html',
    dir : paths.PATH_COVERAGE
  }
}));

// unit tests in CI mode
gulp.task('ci', createKarmaTask({
  autoWatch: true,
  configFile: paths.PATH_CONF_KARMA,
  singleRun: false
}));

gulp.task('nginx', createNginxTask('nginx.conf'));

gulp.task('wsserver', createWSServerTask(false));
gulp.task('wsserver:dev', createWSServerTask(true));

gulp.task('clear:dist', () => {
  return del([
    paths.PATH_DIST
  ]);
});
gulp.task('clear:srcjs', () => {
  return del([
    paths.PATH_SRC_JS
  ]);
});

// todo arusakov eslint task

gulp.task('tslint',  () => {
  return gulp
    .src([
      paths.PATH_SRC_TS + '/**/*.+(ts|tsx)'
    ])
    .pipe(gTslint({
      tslint: require('tslint')
    }))
    .pipe(gTslint.report('verbose'), {
      reportLimit: 10
    });
});

gulp.task('html', ['clear:dist'], () => {
  return gulp
    .src([
      paths.PATH_INDEX_HTML
    ])
    .pipe(gReplace(/distdev\/(.+)\.([^"]+)/g, '$1.min.$2'))
    .pipe(gulp.dest(paths.PATH_DIST));
});

gulp.task('css', ['clear:dist'], createCssTask(false));
gulp.task('css:dev', createCssTask(true));

function createCssTask(dev) {
  return function () {
    var flow = gulp
      .src([
        paths.PATH_STYLES + '/app.scss'
      ])
      .pipe(gSourcemaps.init())
      .pipe(gSass({
        includePaths: [
          paths.PATH_NODE_MODULES + '/bootstrap-sass/assets/stylesheets'
        ],
        precision: 8 // https://github.com/twbs/bootstrap-sass#sass-number-precision
      }).on('error', gSass.logError))
      .pipe(gAutoprefixer({
        browsers: ['last 2 version', 'IE 10']
      }));
    if (!dev) {
      flow = flow
        .pipe(gMinifyCss())
        .pipe(gRename('app.min.css'));
    }
    flow = flow
      .pipe(gSourcemaps.write('./'))
      .pipe(gulp.dest(dev ? paths.PATH_DISTDEV : paths.PATH_DIST));
    return flow;
  };
}

function createKarmaTask(config) {
  return (done) => {
    new KarmaServer(config, (exitCode) => {
      if (!config.autoWatch) {
        done();
      }
    }).start();
  };
}

function createWebpackTask(configPath, config) {
  config = config || {};
  return (done) => {
    var cfg = extend(require(configPath), config);
    webpack(cfg, (err, stats) => {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }
      gutil.log('[webpack]', stats.toString({}));
      if (!config.watch) {
        done();
      }
    });
  };
}

function createTypeScriptTask(projectPath, watch) {
  // arusakov: i didn't find great tsc plugin, so...
  var options = ['--project', projectPath];
  if (watch) {
    options.push('--watch');
  }
  return (done) => {
    var tsc = spawn('./node_modules/.bin/tsc', options);
    tsc.stdout.on('data', function (data) {
      process.stdout.write(data.toString());
    });
    tsc.on('close', function (code) {
      done(code);
    });
  };
}

function createWSServerTask(dev) {
  return (done) => {
    wsserver(true);
    if (!dev) {
      done();
    }
  };
}

function createNginxTask(nginxConf) {
  return (done) => {
    exec('nginx -s quit', () => {
      var nginxCmd = 'nginx ' +
        '-c ' + paths.PATH_CONFIGS + '/' + nginxConf +
        ' -p ' + paths.PATH_PROJECT_ROOT;
      console.log(nginxCmd);
      exec(nginxCmd, function (/* err, stdout, stderr */) {
        done();
      });
    });
  };
}
