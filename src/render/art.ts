import {BaseEngine} from './base-engine';
import {RenderData} from '../model/table-info.model';
import * as path from 'path';
import * as template from 'art-template';

template.defaults.imports.toCamelCase = function (value) {
  return value.split('-').map((word, i) =>
    i === 0 ?
      word :
      ([...word].map((char, j) =>
        j === 0 ?
          char.toUpperCase() :
          char)
        .join(''))
  ).join('');
};

template.defaults.imports.toPreUpper = function (value) {
  return value.split('-').map((word, i) =>
    [...word].map((char, j) =>
      j === 0 ?
        char.toUpperCase() :
        char)
      .join('')
  ).join('');
};

export class ArtTemplateEngine implements BaseEngine {
  renderData;

  constructor(renderData: RenderData) {
    this.renderData = renderData;
  }

  render(templateDir: string): Array<string> {
    if (!templateDir.endsWith('.art')) {
      return [];
    }

    const targetName = templateDir.substring(templateDir.lastIndexOf(path.sep))
      .replace('.art', '').replace(/{{name}}/, this.renderData.component);

    return [targetName, template(templateDir, this.renderData)];
  }

  getRenderData(): RenderData {
    return this.renderData;
  }
}