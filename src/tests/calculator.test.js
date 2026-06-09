const calc = require('../calculator');

describe('Calculator module', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(calc.sub(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(calc.mul(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(calc.div(20, 5)).toBe(4);
  });

  test('addition with floats: 0.1 + 0.2 ~= 0.3', () => {
    expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3, 5);
  });

  test('division by zero returns Infinity', () => {
    expect(calc.div(1, 0)).toBe(Infinity);
  });

  test('multiplication by zero', () => {
    expect(calc.mul(5, 0)).toBe(0);
  });

  test('subtraction resulting negative', () => {
    expect(calc.sub(2, 5)).toBe(-3);
  });
});
