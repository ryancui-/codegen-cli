#! /usr/bin/env node --harmony
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _mysql = require('./db/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

_commander2.default.version('1.0.0').arguments('<template>').option('-h, --host <host>', 'Database host').option('-u, --user <user>', 'Database user').option('-p, --password <password>', 'Database password').option('-t, --table <database.table>', 'Database table').option('--camel-case', 'use camel case column name').parse(process.argv);

var templateName = _commander2.default.args[0];
if (!(_commander2.default.host && _commander2.default.user && _commander2.default.password && _commander2.default.table)) {
  console.log('Missing parameters');
} else {
  var dbConfig = {
    host: _commander2.default.host,
    user: _commander2.default.user,
    password: _commander2.default.password,
    database: _commander2.default.table.split('.')[0]
  };
  var table = _commander2.default.table.split('.')[1];

  (0, _mysql2.default)(dbConfig, table, _commander2.default.camelCase).then(function (res) {
    console.log(res);
  });
}