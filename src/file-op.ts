import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import {BaseEngine} from './render/base-engine';

export class Codegen {
  engine;

  constructor(engine: BaseEngine) {
    this.engine = engine;
  }

  /**
   * Start the code generation
   * @param srcDir
   * @param distDir
   */
  start(srcDir, distDir) {
    console.log('\nGenerating files ...\n');
    this.renderFilesUnderDir(srcDir, distDir);
    console.log(chalk.green('\nSuccess'));
  }

  /**
   * Render templates under srcDir into targetDir
   * @param srcDir
   * @param targetDir
   */
  renderFilesUnderDir(srcDir, targetDir) {
    var files = fs.readdirSync(srcDir);
    files.forEach(filename => {
      var fullname = path.join(srcDir, filename);
      var stats = fs.statSync(fullname);

      if (stats.isDirectory()) {
        const targetRealDir = path.join(targetDir, filename);
        if (!fs.existsSync(targetRealDir)) {
          fs.mkdirSync(targetRealDir);
          console.log(chalk.green('Create ' + targetRealDir));
        }
        this.renderFilesUnderDir(fullname, targetRealDir);
      } else {
        const targetFile = path.join(targetDir,
          filename.replace('.art', '').replace(/{{name}}/, this.engine.getRenderData().component));
        let action = 'Create';

        if (fs.existsSync(targetFile)) {
          action = 'Replace';
          fs.unlinkSync(targetFile);
        }

        fs.writeFileSync(targetFile, this.engine.render(fullname));
        console.log(action === 'Create' ?
          chalk.green(action + ' ' + targetFile) :
          chalk.yellow(action + ' ' + targetFile));
      }
    });
  }

  /**
   * Delete directory
   * @param path
   */
  private deleteAll(path: string) {
    if (fs.existsSync(path)) {
      const files = fs.readdirSync(path);
      files.forEach((file) => {
        const curPath = path + '/' + file;
        if (fs.statSync(curPath).isDirectory()) {
          this.deleteAll(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }
}
