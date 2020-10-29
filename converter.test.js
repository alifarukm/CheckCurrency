const Converter = require('./converter');

var converter;
beforeAll(function () {
  converter = Converter()
  converter.calculate = jest.fn().mockReturnValue(2)
})

describe('-- conversion test --', function() {
  test('left to right', () => {
    expect(converter.convert('1 USD = ? TRY')).toBe('1 USD = 2 TRY');
  });

  test('right to left', () => {
    expect(converter.convert('? USD = 1 TRY')).toBe('2 USD = 1 TRY');
  });
})