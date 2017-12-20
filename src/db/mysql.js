import mysql from 'mysql';

// Get table description sql
const DESCRIBE_SQL = `
select
  column_name, column_comment, data_type, is_nullable
from
  information_schema.columns
where
  table_schema = '$db' and table_name = '$table'
`;

// transform the data format to meet the standard
const transformDataType = (result) => {
  return result.map(data => {
    return {
      column: data.column_name,
      comment: data.column_comment,
      type: data.data_type
        .replace(/int|decimal|tinyint/, 'number')
        .replace(/varchar/, 'string')
        .replace(/datetime/, 'date'),
      allowNull: data.is_nullable.toLowerCase() === 'yes'
    };
  });
};

export default (dbConfig, table) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.connect();
    connection.query(DESCRIBE_SQL.replace('$db', dbConfig.database).replace('$table', table),
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(transformDataType(results));
      });
    connection.end();
  });
};
