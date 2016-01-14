Frontend infrastructure based on:
* [TypeScript] (https://www.typescriptlang.org/)
* [Babel] (https://babeljs.io/)
* [Sass] (http://sass-lang.com/)
* [Autoprefixer] (https://github.com/postcss/autoprefixer)
* [Gulp] (http://gulpjs.com/)
* [Webpack] (https://webpack.github.io/)
* [Karma] (https://karma-runner.github.io/)
* [Jasmine] (http://jasmine.github.io/)
* [Istanbul] (https://gotwarlost.github.io/istanbul/)
* [Ispara] (https://github.com/douglasduteil/isparta)

Dependencies
============
* node.js with npm

Global npm packages
-------------------
* gulp (required)
* karma-cli (optional)
* typescript (optional)

Get started
===========
* npm i

Development
===========
* gulp dev - start nginx and webpack in watch mode
* gulp tsc:watch - only if IDE doesn't provide builtin watcher
* gulp ci - run unit tests in CI (watch) mode
* gulp coverage - for code coverage

Without gulp
------------
All configs located in separated files, so you can run tasks without gulp (may be useful for debug):

* tsc -p ./src && webpack --config configs/webpack.config.dev
* karma start configs/karma.conf.js --autoWatch true
* karma start configs/karms.conf.coverage.js

Unit test in Chrome
-------------------
* npm install -g karma-cli
* npm install karma-chrome-launcher
* karma start configs/karma.conf.js --singleRun false --browsers Chrome

Production
==========
* ./build and ./test bash scripts in project root
