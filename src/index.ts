#! /usr/bin/env node

import {Commander} from './command';
import {MySQLProvider} from './db/mysql';
import {Codegen} from './file-op';
import {ArtTemplateEngine} from './render/art';
import {RenderData} from './model/table-info.model';

const commander = new Commander();

commander.run().then(params => {
  if (params.dbConfig !== null) {
    const mysqlProvider = new MySQLProvider(params.dbConfig);
    mysqlProvider.getRenderData().then((res: RenderData) => {
      res.component = params.componentName;

      const artEngine = new ArtTemplateEngine(res);
      const codeGen = new Codegen(artEngine);

      codeGen.start(__dirname + `/../tpl/${params.templateName}/`, process.cwd());
    });
  } else {
    const artEngine = new ArtTemplateEngine({
      component: params.componentName,
      columns: []
    });
    const codeGen = new Codegen(artEngine);

    codeGen.start(__dirname + `/../tpl/${params.templateName}/`, process.cwd());
  }
});

