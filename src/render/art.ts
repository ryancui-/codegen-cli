import {BaseEngine} from './base-engine';
import {RenderData} from '../model/table-info.model';
import * as template from 'art-template';

export class ArtTemplateEngine implements BaseEngine {
  renderData;

  constructor(renderData: RenderData) {
    this.renderData = renderData;
  }

  render(templateDir: string): Array<string> {
    if (!templateDir.endsWith('.art')) {
      return [];
    }

    const targetName = templateDir.substring(templateDir.lastIndexOf('/'))
      .replace('.art', '').replace(/{{name}}/, this.renderData.component);

    return [targetName, template(templateDir, this.renderData)];
  }

  getRenderData(): RenderData {
    return this.renderData;
  }
}