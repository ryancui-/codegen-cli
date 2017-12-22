#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const mysql_1 = require("./db/mysql");
const codegen_1 = require("./codegen");
const tpl_download_1 = require("./tpl-download");
const art_1 = require("./render/art");
const chalk_1 = require("chalk");
try {
    const commander = new command_1.Commander();
    commander.run().then(params => {
        const templateDownload = new tpl_download_1.TemplateDownload(params.templateName);
        templateDownload.download().then(templateDir => {
            if (params.dbConfig !== null) {
                const mysqlProvider = new mysql_1.MySQLProvider(params.dbConfig);
                mysqlProvider.getRenderData().then((res) => {
                    res.component = params.componentName;
                    const artEngine = new art_1.ArtTemplateEngine(res);
                    const codeGen = new codegen_1.Codegen(artEngine);
                    codeGen.start(templateDir, process.cwd());
                    templateDownload.remove();
                }, err => {
                    templateDownload.remove();
                    console.log(chalk_1.default.red('\nError getting data from database, please make sure the config is correct'));
                });
            }
            else {
                const artEngine = new art_1.ArtTemplateEngine({
                    component: params.componentName,
                    columns: []
                });
                const codeGen = new codegen_1.Codegen(artEngine);
                codeGen.start(templateDir, process.cwd());
                templateDownload.remove();
            }
        }, err => {
            console.log(chalk_1.default.red('\nError downloading template, please make sure the repo exists'));
        });
    });
}
catch (err) {
  console.log(chalk_1.default.gray('\nUnexpected error happened, plz contact me and the reproduce procedures'));
}
