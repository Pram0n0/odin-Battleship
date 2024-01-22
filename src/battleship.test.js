import analyseArray from "./analyseArray";

test('normal number array', () => {
  expect(analyseArray([1, 2, 3, 4, 5])).toEqual({
    average: 3,
    min: 1,
    max: 5,
    length: 5,
  });
});

test('array-like object (string)', () => {
  expect(analyseArray('12345')).toBe('Not an array');
});

test('array empty', () => {
  expect(analyseArray([])).toBe('Array is empty');
});

test('array with non-number', () => {
  expect(analyseArray([1, 2, 3, 4, '5'])).toBe('Array contains non-numeric elements');
});