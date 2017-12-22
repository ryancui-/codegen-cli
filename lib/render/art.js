"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const template = require("art-template");
const utils_1 = require('../utils');
template.defaults.imports.toCamelCase = utils_1.Utils.toCamelCase;
template.defaults.imports.toPreUpper = utils_1.Utils.toPreUpper;
class ArtTemplateEngine {
    constructor(renderData) {
        this.renderData = renderData;
    }
    render(templateDir) {
        if (!templateDir.endsWith('.art')) {
            return [];
        }
        const targetName = templateDir.substring(templateDir.lastIndexOf(path.sep))
            .replace('.art', '').replace(/{{name}}/, this.renderData.component);
        return [targetName, template(templateDir, this.renderData)];
    }
    getRenderData() {
        return this.renderData;
    }
}
exports.ArtTemplateEngine = ArtTemplateEngine;
