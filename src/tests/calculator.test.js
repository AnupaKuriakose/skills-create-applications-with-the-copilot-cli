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

  // New tests for extended operations
  test('modulo: 5 % 2 = 1', () => {
    expect(calc.modulo(5, 2)).toBe(1);
  });

  test('power: 2 ** 8 = 256', () => {
    expect(calc.power(2, 8)).toBe(256);
  });

  test('power with non-integer exponent: 9 ** 0.5 = 3', () => {
    expect(calc.power(9, 0.5)).toBeCloseTo(3, 10);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(calc.squareRoot(16)).toBe(4);
  });

  test('squareRoot: sqrt(2) ~= 1.41421356', () => {
    expect(calc.squareRoot(2)).toBeCloseTo(1.41421356, 8);
  });

  test('squareRoot of negative number throws RangeError', () => {
    expect(() => calc.squareRoot(-4)).toThrow(RangeError);
    expect(() => calc.squareRoot(-4)).toThrow(/negative/i);
  });
});
