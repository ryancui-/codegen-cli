import mysql from 'mysql';

export default (dbConfig, table) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.connect();
    connection.query(`select * from ${table}`, function (error, results, fields) {
      if (error) {
        reject(error);
      }
      resolve(results);
    });

    connection.end();
  });
};
