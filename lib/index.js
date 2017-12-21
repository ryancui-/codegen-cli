#! /usr/bin/env node
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const program = require('commander');
const mysql_1 = require('./db/mysql');
const file_op_1 = require('./file-op');
const art_1 = require('./render/art');
program
  .version('1.0.0')
  .arguments('<template>')
  .option('-h, --host <host>', 'Database host')
  .option('-u, --user <user>', 'Database user')
  .option('-p, --password <password>', 'Database password')
  .option('-t, --table <database.table>', 'Database table')
  .parse(process.argv);
const templateName = program.args[0];
if (!(program.host && program.user && program.password && program.table)) {
  console.log('Missing parameters');
}
else {
  const dbConfig = {
    host: program.host,
    user: program.user,
    password: program.password,
    database: program.table.split('.')[0]
  };
  const table = program.table.split('.')[1];
  const mysqlProvider = new mysql_1.MySQLProvider(dbConfig, table);
  mysqlProvider.getRenderData().then((res) => {
    const artEngine = new art_1.ArtTemplateEngine(res);
    const codeGen = new file_op_1.Codegen(artEngine);
    codeGen.start(__dirname + `/../tpl/${templateName}/`, process.cwd());
  });
}
