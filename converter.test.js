const Converter = require('./converter');

var converter;
beforeAll(function () {
  converter = Converter()
  converter.calculate = jest.fn().mockReturnValue(2)
})

describe('-- conversion test --', function() {
  test('left to right', async () => {
    expect(await converter.convert('1 USD = ? TRY')).toBe('1.00 USD = 2 TRY');
  });

  test('right to left', async () => {
    expect(await converter.convert('? USD = 1 TRY')).toBe('2 USD = 1.00 TRY');
  });
})