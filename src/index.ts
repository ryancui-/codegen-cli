#! /usr/bin/env node
// import program = require('commander');
import * as program from 'commander';
import {MySQLProvider} from './db/mysql';
import {Codegen} from './file-op';
import {ArtTemplateEngine} from './render/art';
import {RenderData} from './model/table-info.model';

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
} else {
  const dbConfig = {
    host: program.host,
    user: program.user,
    password: program.password,
    database: program.table.split('.')[0]
  };
  const table = program.table.split('.')[1];

  const mysqlProvider = new MySQLProvider(dbConfig, table);
  mysqlProvider.getRenderData().then((res: RenderData) => {
    const artEngine = new ArtTemplateEngine(res);
    const codeGen = new Codegen(artEngine);

    codeGen.start(__dirname + `/../tpl/${templateName}/`, process.cwd());
  });
}
