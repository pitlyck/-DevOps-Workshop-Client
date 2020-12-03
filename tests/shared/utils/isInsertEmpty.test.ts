import { isInsertEmpty } from '../../../src/shared/utils/textUtils';

describe('Correctly decides whether the text in insert-boxes is empty or not', () => {
  const invalidTexts = [
    {name: 'empty text', text: ''},
    {name: 'spaced text', text: '      '},
    {name: 'spaced text', text: undefined},
  ];

  const validTets = [
    {name: 'standard text', text: 'standard text'},
    {name: 'spaced beginning and valid text', text: '      text'},
    {name: 'valid text and spaced ending ', text: 'text      '},
    {name: 'spaced beginning and ending and valid text in-between', text: '      text      '},

  ];

  invalidTexts.forEach(testCase => {
    it('returns true when ' + testCase.name + ' is inserted', () => {
      const actual = isInsertEmpty(testCase.text);
      console.log('actual', actual);
      console.log('text', `'${testCase.text}'`);

      expect(actual).toBe(true);
    });
  });

  validTets.forEach(testCase => {
    it('returns false when ' + testCase.name + ' is inserted', () => {
      const actual = isInsertEmpty(testCase.text);

      expect(actual).toBe(false);
    });
  });
});
