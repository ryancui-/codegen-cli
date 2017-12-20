'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

exports.default = function (dbConfig, table) {
  var connection = _mysql2.default.createConnection(dbConfig);

  return new Promise(function (resolve, reject) {
    connection.connect();
    connection.query('select * from ' + table, function (error, results, fields) {
      if (error) {
        reject(error);
      }
      resolve(results);
    });

    connection.end();
  });
};