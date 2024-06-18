import { toCamelCase } from './stringUtils';

describe('stringUtils', () => {
  describe('toCamelCase', () => {
    test('should convert string to camel case properly', () => {
      expect(toCamelCase('sample text')).toEqual('sampleText');
      expect(toCamelCase('Sample Text')).toEqual('sampleText');
      expect(toCamelCase('sample-text')).toEqual('sampleText');
      expect(toCamelCase('sample_text')).toEqual('sampleText');
    });
  });
});
