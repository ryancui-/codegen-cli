import * as program from 'commander';
import * as inquirer from 'inquirer';
import {CommandParams} from './model/command.model';

export class Commander {
  run(): Promise<CommandParams> {
    return new Promise(resolve => {
      program
        .version('1.0.0')
        .arguments('<template>')
        .option('--host <host>', 'Database host')
        .option('--user <user>', 'Database user')
        .option('--password <password>', 'Database password')
        .option('--schema <schema>', 'Database schema')
        .option('--table <table>', 'Database table')
        .option('--db', 'Interact way to give database config')
        .option('--component-name <componentName>', 'Component name')
        .action((cmd, options) => {
          const templateName = cmd;
          if (!templateName.match(/.*\/.*/)) {
            console.log('\nError: template name should have format user/repo\n');
            process.exit(1);
          }

          const prompts = [];

          if (options.db || options.host || options.user || options.password || options.schema || options.table) {
            if (!options.host) {
              prompts.push({
                type: 'input',
                name: 'host',
                message: 'Input database <host>:',
                validate: function (input) {
                  if (!input) {
                    return 'host cannot be empty';
                  }
                  return true;
                }
              });
            }

            if (!options.user) {
              prompts.push({
                type: 'input',
                name: 'user',
                message: 'Input database <user>:',
                validate: function (input) {
                  if (!input) {
                    return 'user cannot be empty';
                  }
                  return true;
                }
              });
            }

            if (!options.password) {
              prompts.push({
                type: 'password',
                name: 'password',
                message: 'Input database <password>:'
              });
            }

            if (!options.schema) {
              prompts.push({
                type: 'input',
                name: 'schema',
                message: 'Input database <schema>:',
                validate: function (input) {
                  if (!input) {
                    return 'schema cannot be empty';
                  }
                  return true;
                }
              });
            }

            if (!options.table) {
              prompts.push({
                type: 'input',
                name: 'table',
                message: 'Input database <table>:',
                validate: function (input) {
                  if (!input) {
                    return 'table cannot be empty';
                  }
                  return true;
                }
              });
            }
          }

          if (!options.componentName) {
            prompts.push({
              type: 'input',
              name: 'componentName',
              message: 'Input component name:',
              validate: function (input) {
                if (!input) {
                  return 'component name cannot be empty';
                }
                return true;
              }
            });
          }

          inquirer.prompt(prompts).then(answers => {
            const params = Object.assign({
              host: options.host,
              user: options.user,
              password: options.password,
              schema: options.schema,
              table: options.table
            }, answers);

            resolve({
              componentName: options.componentName || answers.componentName,
              templateName,
              dbConfig: params.host ? params : null
            });
          });
        })
        .parse(process.argv);

      const templateName = program.args[0];
      if (!templateName) {
        program.help();
      }
    });
  }
}