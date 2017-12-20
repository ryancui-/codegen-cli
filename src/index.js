#! /usr/bin/env node --harmony

const program = require('commander');
import getDatabaseMetaData from './db/mysql';

program
  .version('1.0.0')
  .arguments('<template>')
  .option('-h, --host <host>', 'Database host')
  .option('-u, --user <user>', 'Database user')
  .option('-p, --password <password>', 'Database password')
  .option('-t, --table <database.table>', 'Database table')
  .parse(process.argv);

const templateName = program.args[0];
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


