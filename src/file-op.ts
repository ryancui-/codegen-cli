import * as fs from 'fs';
import * as path from 'path';
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
    this.renderFilesUnderDir(srcDir, distDir);
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
        }
        this.renderFilesUnderDir(fullname, targetRealDir);
      } else {
        const targetFile = path.join(targetDir, filename.replace('.art', ''));
        if (fs.existsSync(targetFile)) {
          fs.unlinkSync(targetFile);
        }
        fs.writeFileSync(targetFile, this.engine.render(fullname));
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
