'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Delete directory
 * @param path
 */
var deleteAll = function deleteAll(path) {
  if (_fs2.default.existsSync(path)) {
    var files = _fs2.default.readdirSync(path);
    files.forEach(function (file) {
      var curPath = path + '/' + file;
      if (_fs2.default.statSync(curPath).isDirectory()) {
        deleteAll(curPath);
      } else {
        _fs2.default.unlinkSync(curPath);
      }
    });
    _fs2.default.rmdirSync(path);
  }
};

var renderFilesUnderDir = function renderFilesUnderDir(dir, target) {
  var files = _fs2.default.readdirSync(dir);
  files.forEach(function (filename) {
    var fullname = _path2.default.join(dir, filename);
    var stats = _fs2.default.statSync(fullname);

    if (stats.isDirectory()) {
      var targetDir = _path2.default.join(target, filename);
      if (!_fs2.default.existsSync(targetDir)) {
        _fs2.default.mkdirSync(targetDir);
      }
      renderFilesUnderDir(fullname, targetDir);
    } else {
      var targetFile = _path2.default.join(target, filename.replace('.art', ''));
      if (_fs2.default.existsSync(targetFile)) {
        _fs2.default.unlinkSync(targetFile);
      }
      _fs2.default.writeFileSync(targetFile, 'Hello, world');
    }
  });
};

exports.default = function (srcDir) {
  var pwd = process.cwd();
  renderFilesUnderDir(srcDir, pwd);
};