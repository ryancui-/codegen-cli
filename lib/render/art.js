'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const template = require('art-template');
class ArtTemplateEngine {
  constructor(renderData) {
    this.renderData = renderData;
  }

  render(templateDir) {
    if (!templateDir.endsWith('.art')) {
      return [];
    }
    const targetName = templateDir.substring(templateDir.lastIndexOf('/'))
      .replace('.art', '').replace(/{{name}}/, this.renderData.component);
    return [targetName, template(templateDir, this.renderData)];
  }

  getRenderData() {
    return this.renderData;
  }
}
exports.ArtTemplateEngine = ArtTemplateEngine;
