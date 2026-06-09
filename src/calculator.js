#!/usr/bin/env node

/**
 * CLI Calculator
 * Supported operations:
 *  - add : addition (+)
 *  - sub : subtraction (-)
 *  - mul : multiplication (×)
 *  - div : division (÷)
 *  - modulo : remainder (%)
 *  - pow / power : exponentiation
 *  - sqrt : square root
 *
 * Usage examples:
 *   node src/calculator.js add 2 3       # 5
 *   node src/calculator.js sub 5 2       # 3
 *   node src/calculator.js mul 4 2.5     # 10
 *   node src/calculator.js div 10 2      # 5
 *   node src/calculator.js modulo 10 3   # 1
 *   node src/calculator.js pow 2 8       # 256
 *   node src/calculator.js sqrt 2        # 1.41421356
 *
 * The script validates numeric inputs and handles division by zero and invalid sqrt inputs.
 */

function printUsage() {
  console.error('Usage: node src/calculator.js <op> <num1> [<num2>]');
  console.error('Where <op> is one of: add, sub, mul, div, modulo, pow, power, sqrt');
  console.error('Note: sqrt expects a single operand. Other ops expect two operands.');
  console.error('Examples:');
  console.error('  node src/calculator.js pow 2 8');
  console.error('  node src/calculator.js sqrt 2');
}

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function parseNumber(input) {
  const n = Number(input);
  return Number.isFinite(n) ? n : NaN;
}

function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) { return a / b; }
function modulo(a, b) { return a % b; }
function power(base, exponent) { return Math.pow(base, exponent); }
function squareRoot(n) {
  if (n < 0) {
    // Throw so callers (including tests) can handle programmatically
    throw new RangeError('squareRoot: negative input');
  }
  return Math.sqrt(n);
}

// Allow this file to be required as a module
module.exports = { add, sub, mul, div, modulo, power, squareRoot };

// If invoked directly, run the CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const op = args[0] && args[0].toLowerCase();

  if (!op) {
    printUsage();
    process.exitCode = 1; // invalid usage
    process.exit(1);
  }

  // Handle operations with one or two operands
  try {
    let result;

    if (op === 'sqrt') {
      if (args.length !== 2) {
        console.error('Error: sqrt expects exactly one operand.');
        printUsage();
        process.exitCode = 1;
        process.exit(1);
      }
      const n = parseNumber(args[1]);
      if (Number.isNaN(n)) {
        console.error('Error: operand must be a valid number.');
        process.exitCode = 1;
        process.exit(1);
      }
      try {
        result = squareRoot(n);
      } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exitCode = 3; // domain error
        process.exit(3);
      }
    } else {
      // two-operand operations
      if (args.length !== 3) {
        printUsage();
        process.exitCode = 1;
        process.exit(1);
      }

      const a = parseNumber(args[1]);
      const b = parseNumber(args[2]);

      if (Number.isNaN(a) || Number.isNaN(b)) {
        console.error('Error: both operands must be valid numbers.');
        process.exitCode = 1;
        process.exit(1);
      }

      switch (op) {
        case 'add':
          result = add(a, b);
          break;
        case 'sub':
          result = sub(a, b);
          break;
        case 'mul':
          result = mul(a, b);
          break;
        case 'div':
          if (b === 0) {
            console.error('Error: division by zero');
            process.exitCode = 2; // division by zero
            process.exit(2);
          }
          result = div(a, b);
          break;
        case 'modulo':
        case 'mod':
          result = modulo(a, b);
          break;
        case 'pow':
        case 'power':
          result = power(a, b);
          break;
        case 'help':
        case '-h':
        case '--help':
          printUsage();
          process.exit(0);
        default:
          console.error(`Error: unknown operation '${op}'.`);
          printUsage();
          process.exitCode = 1;
          process.exit(1);
      }
    }

    // Print result to stdout for easy scripting
    if (result !== undefined) {
      if (Number.isInteger(result)) {
        console.log(result);
      } else {
        console.log(result);
      }
      process.exit(0);
    }
  } catch (err) {
    console.error(`Unexpected error: ${err.message}`);
    process.exitCode = 99;
    process.exit(99);
  }
}
