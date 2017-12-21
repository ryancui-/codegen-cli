import {BaseEngine} from './base-engine';
import {RenderData} from '../model/table-info.model';
import * as template from 'art-template';

export class ArtTemplateEngine implements BaseEngine {
  renderData;

  constructor(renderData: RenderData) {
    this.renderData = renderData;
  }

  render(templateDir: string): string {
    return template(templateDir, this.renderData);
  }
}