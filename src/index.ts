#! /usr/bin/env node

import {Commander} from './command';
import {MySQLProvider} from './db/mysql';
import {Codegen} from './codegen';
import {TemplateDownload} from './tpl-download';
import {ArtTemplateEngine} from './render/art';
import {RenderData} from './model/table-info.model';
import chalk from 'chalk';

try {
  const commander = new Commander();

  commander.run().then(params => {
    const templateDownload = new TemplateDownload(params.templateName);
    templateDownload.download().then(templateDir => {
      if (params.dbConfig !== null) {
        const mysqlProvider = new MySQLProvider(params.dbConfig);
        mysqlProvider.getRenderData().then((res: RenderData) => {
          res.component = params.componentName;

          const artEngine = new ArtTemplateEngine(res);
          const codeGen = new Codegen(artEngine);

          codeGen.start(templateDir, process.cwd());
          templateDownload.remove();
        }, err => {
          console.log(chalk.red('\nError getting data from database, please make sure the config is correct'));
        });
      } else {
        const artEngine = new ArtTemplateEngine({
          component: params.componentName,
          columns: []
        });
        const codeGen = new Codegen(artEngine);

        codeGen.start(templateDir, process.cwd());
        templateDownload.remove();
      }
    }, err => {
      console.log(chalk.red('\nError downloading template, please make sure the repo exists'));
    });
  });
} catch (err) {
  console.log(chalk.gray('Unexpected error happened, plz contact me and the reproduce procedures'));
}


