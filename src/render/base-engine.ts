export interface BaseEngine {
  /**
   * Render the template
   * @param templateDir template file directory
   * @return rendered string
   */
  render(templateDir: string): string;
}