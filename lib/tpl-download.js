"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gitDownload = require("download-git-repo");
const fs = require("fs");
const path = require("path");
const chalk_1 = require("chalk");
class TemplateDownload {
    constructor(repo) {
        this.TEMPLATE_DIR = path.join(__dirname, '../template');
        this.repo = repo;
    }
    download() {
        return new Promise((resolve, reject) => {
            console.log('\nDownloading templates from ' + this.repo + ' ...');
            gitDownload(this.repo, this.TEMPLATE_DIR, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(chalk_1.default.green('\nTemplates now available at ' + this.TEMPLATE_DIR));
                    resolve(this.TEMPLATE_DIR);
                }
            });
        });
    }
    remove() {
        console.log(chalk_1.default.gray('\nDeleting template files ...\n'));
        this.deleteAll(this.TEMPLATE_DIR);
    }
    /**
     * Delete directory
     * @param path
     */
    deleteAll(path) {
        if (fs.existsSync(path)) {
            const files = fs.readdirSync(path);
            files.forEach((file) => {
                const curPath = path + '/' + file;
                if (fs.statSync(curPath).isDirectory()) {
                    this.deleteAll(curPath);
                }
                else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
}
exports.TemplateDownload = TemplateDownload;
