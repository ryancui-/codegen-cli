#! /usr/bin/env node --harmony
'use strict';

var _mysql = require('./db/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var program = require('commander');


program.version('1.0.0').arguments('<template>').option('-h, --host <host>', 'Database host').option('-u, --user <user>', 'Database user').option('-p, --password <password>', 'Database password').option('-t, --table <database.table>', 'Database table').parse(process.argv);

var templateName = program.args[0];
var dbConfig = {
  host: program.host,
  user: program.user,
  password: program.password,
  database: program.table.split('.')[0]
};
var table = program.table.split('.')[1];

(0, _mysql2.default)(dbConfig, table).then(function (res) {
  console.log(res);
});