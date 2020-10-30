const Converter = require('./converter');

var converter;
beforeAll(function () {
  converter = Converter()
  converter.calculate = jest.fn().mockReturnValue(2)
})

describe('-- conversion test --', function() {
  test('left to right', () => {
    expect(converter.convert('? TRY = 2.5 USD')).toBe('20.81 TRY = 2.50 USD');
  });

  test('right to left', () => {
    expect(converter.convert('? USD = 1 TRY')).toBe('0.12 USD = 1.00 TRY');
  });
})