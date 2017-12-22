import {BaseEngine} from './base-engine';
import {RenderData} from '../model/table-info.model';
import * as path from 'path';
import * as template from 'art-template';
import {Utils} from '../utils';

template.defaults.imports.toCamelCase = Utils.toCamelCase;
template.defaults.imports.toPreUpper = Utils.toPreUpper;

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