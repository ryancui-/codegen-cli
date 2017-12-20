import fs from 'fs';
import path from 'path';

/**
 * Delete directory
 * @param path
 */
const deleteAll = (path) => {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);
    files.forEach((file) => {
      const curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteAll(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const renderFilesUnderDir = (dir, target) => {
  var files = fs.readdirSync(dir);
  files.forEach(filename => {
    var fullname = path.join(dir, filename);
    var stats = fs.statSync(fullname);

    if (stats.isDirectory()) {
      const targetDir = path.join(target, filename);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
      }
      renderFilesUnderDir(fullname, targetDir);
    } else {
      const targetFile = path.join(target, filename.replace('.art', ''));
      if (fs.existsSync(targetFile)) {
        fs.unlinkSync(targetFile);
      }
      fs.writeFileSync(targetFile, 'Hello, world');
    }
  });
};

export default (srcDir) => {
  const pwd = process.cwd();
  renderFilesUnderDir(srcDir, pwd);
};
