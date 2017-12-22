'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
class Utils {
  /**
   * Change bar-seperate string to camel case
   * @param value
   */
  static toCamelCase(value) {
    return value.split('-').map((word, i) => i === 0 ?
      word :
      ([...word].map((char, j) => j === 0 ?
        char.toUpperCase() :
        char)
        .join(''))).join('');
  }

  /**
   * Change bar-seperate string to pre upper case
   * @param value
   */
  static toPreUpper(value) {
    return value.split('-').map((word, i) => [...word].map((char, j) => j === 0 ?
      char.toUpperCase() :
      char)
      .join('')).join('');
  }
}
exports.Utils = Utils;
