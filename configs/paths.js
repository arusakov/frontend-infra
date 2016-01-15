var path = require('path');

var PROJECT_ROOT = path.resolve(__dirname, '..');

exports.PATH_CONF_KARMA = '/configs/karma.conf.js';
exports.PATH_CONF_KARMA_COVER = '/configs/karma.conf.coverage.js';
exports.PATH_CONF_WEBPACK_DEV = '/configs/webpack.config.dev.js';
exports.PATH_CONF_WEBPACK_PRODUCTION = '/configs/webpack.config.production.js';
exports.PATH_CONFIGS = '/configs';
exports.PATH_COVERAGE = '/coverage';
exports.PATH_DIST = '/dist';
exports.PATH_DISTDEV = '/distdev';
exports.PATH_ENTRY = '/srcjs/index.js';
exports.PATH_INDEX_HTML = '/index.html';
exports.PATH_NODE_MODULES = '/node_modules';
exports.PATH_PROJECT_ROOT = '';
exports.PATH_SERVER = '/server/server.js';
exports.PATH_SRC_TS = '/src';
exports.PATH_SRC_JS = '/srcjs';
exports.PATH_STYLES = '/styles';
exports.PATH_TESTS = '/tests';

for (var k in exports) {
  exports[k] = PROJECT_ROOT + exports[k];
}
