import {RenderData} from '../model/table-info.model';
export interface BaseEngine {
  /**
   * Render the template
   * @param templateDir template file directory
   * @return rendered string
   */
  render(templateDir: string): string;

  /**
   * Return the render data this engine use
   */
  getRenderData(): RenderData;
}