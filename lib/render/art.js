'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const template = require('art-template');
class ArtTemplateEngine {
  constructor(renderData) {
    this.renderData = renderData;
  }

  render(templateDir) {
    return template(templateDir, this.renderData);
  }
}
exports.ArtTemplateEngine = ArtTemplateEngine;
