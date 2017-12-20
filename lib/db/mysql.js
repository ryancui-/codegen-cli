'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

// Get table description sql
var DESCRIBE_SQL = '\nselect\n  column_name, column_comment, data_type, is_nullable\nfrom\n  information_schema.columns\nwhere\n  table_schema = \'$db\' and table_name = \'$table\'\n';

// transform the data format to meet the standard
var transformDataType = function transformDataType(result) {
  return result.map(function (data) {
    return {
      column: data.column_name,
      comment: data.column_comment,
      type: data.data_type.replace(/int|decimal|tinyint/, 'number').replace(/varchar/, 'string').replace(/datetime/, 'date'),
      allowNull: data.is_nullable.toLowerCase() === 'yes'
    };
  });
};

exports.default = function (dbConfig, table) {
  var connection = _mysql2.default.createConnection(dbConfig);

  return new Promise(function (resolve, reject) {
    connection.connect();
    connection.query(DESCRIBE_SQL.replace('$db', dbConfig.database).replace('$table', table), function (error, results, fields) {
      if (error) {
        reject(error);
        return;
      }

      resolve(transformDataType(results));
    });
    connection.end();
  });
};