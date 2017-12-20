#! /usr/bin/env node --harmony

import program from 'commander';
import getDatabaseMetaData from './db/mysql';

program
  .version('1.0.0')
  .arguments('<template>')
  .option('-h, --host <host>', 'Database host')
  .option('-u, --user <user>', 'Database user')
  .option('-p, --password <password>', 'Database password')
  .option('-t, --table <database.table>', 'Database table')
  .option('--camel-case', 'use camel case column name')
  .parse(process.argv);

const templateName = program.args[0];
if (!(program.host && program.user && program.password && program.table)) {
  console.log('Missing parameters');
} else {
  const dbConfig = {
    host: program.host,
    user: program.user,
    password: program.password,
    database: program.table.split('.')[0]
  };
  const table = program.table.split('.')[1];

  getDatabaseMetaData(dbConfig, table).then(res => {
    console.log(res);
  });
}




