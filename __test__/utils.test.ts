import {Utils} from '../src/utils';

test('Utils.toCamelCase', () => {
  expect(Utils.toCamelCase('')).toBe('');
  expect(Utils.toCamelCase('single')).toBe('single');
  expect(Utils.toCamelCase('two-words')).toBe('twoWords');
  expect(Utils.toCamelCase('many-many-words')).toBe('manyManyWords');
});

test('Utils.toPreUpper', () => {
  expect(Utils.toPreUpper('')).toBe('');
  expect(Utils.toPreUpper('single')).toBe('Single');
  expect(Utils.toPreUpper('two-words')).toBe('TwoWords');
  expect(Utils.toPreUpper('many-many-words')).toBe('ManyManyWords');
});