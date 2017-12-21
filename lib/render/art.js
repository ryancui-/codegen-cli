'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const template = require('art-template');
template.defaults.imports.toCamelCase = function (value) {
  return value.split('-').map((word, i) => i === 0 ?
    word :
    ([...word].map((char, j) => j === 0 ?
      char.toUpperCase() :
      char)
      .join(''))).join('');
};
template.defaults.imports.toPreUpper = function (value) {
  return value.split('-').map((word, i) => [...word].map((char, j) => j === 0 ?
    char.toUpperCase() :
    char)
    .join('')).join('');
};
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
