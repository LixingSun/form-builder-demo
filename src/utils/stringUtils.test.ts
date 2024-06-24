import { toCamelCase } from './stringUtils';

describe('stringUtils', () => {
  describe('toCamelCase', () => {
    test('should remove space and uppercase first character', () => {
      expect(toCamelCase('sample text 1')).toEqual('sampleText1');
      expect(toCamelCase('Sample Text 2')).toEqual('sampleText2');
    });

    test('should remove special characters and uppercase first character', () => {
      expect(toCamelCase('sample-text-1')).toEqual('sampleText1');
      expect(toCamelCase('sample_text_2')).toEqual('sampleText2');
    });

    test('should keep the original string if given string is already in valid format', () => {
      expect(toCamelCase('sampleText')).toEqual('sampleText');
    });
  });
});
