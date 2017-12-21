#! /usr/bin/env node
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const command_1 = require('./command');
const mysql_1 = require('./db/mysql');
const file_op_1 = require('./file-op');
const art_1 = require('./render/art');
const commander = new command_1.Commander();
commander.run().then(params => {
  if (params.dbConfig !== null) {
    const mysqlProvider = new mysql_1.MySQLProvider(params.dbConfig);
    mysqlProvider.getRenderData().then((res) => {
      res.component = params.componentName;
      const artEngine = new art_1.ArtTemplateEngine(res);
      const codeGen = new file_op_1.Codegen(artEngine);
      codeGen.start(__dirname + `/../tpl/${params.templateName}/`, process.cwd());
    });
  }
  else {
    const artEngine = new art_1.ArtTemplateEngine({
      component: params.componentName,
      columns: []
    });
    const codeGen = new file_op_1.Codegen(artEngine);
    codeGen.start(__dirname + `/../tpl/${params.templateName}/`, process.cwd());
  }
});
