import * as gitDownload from 'download-git-repo';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

export class TemplateDownload {
  TEMPLATE_DIR = path.join(__dirname, '../template');
  repo;
  templateDir;

  constructor(repo) {
    this.repo = repo;
  }

  download(): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('\nDownloading templates from ' + this.repo + ' ...');
      gitDownload(this.repo, this.TEMPLATE_DIR, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(chalk.green('\nTemplates now available at ' + this.TEMPLATE_DIR));
          resolve(this.TEMPLATE_DIR);
        }
      });
    });
  }

  remove() {
    console.log(chalk.gray('\nDeleting template files ...\n'));
    this.deleteAll(this.TEMPLATE_DIR);
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