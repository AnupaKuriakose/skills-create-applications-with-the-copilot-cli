#!/usr/bin/env node

/**
 * CLI Calculator
 * Supported operations:
 *  - add : addition (+)
 *  - sub : subtraction (-)
 *  - mul : multiplication (×)
 *  - div : division (÷)
 *
 * Usage examples:
 *   node src/calculator.js add 2 3    # 5
 *   node src/calculator.js sub 5 2    # 3
 *   node src/calculator.js mul 4 2.5  # 10
 *   node src/calculator.js div 10 2   # 5
 *
 * The script validates numeric inputs and handles division by zero.
 */

function printUsage() {
  console.error('Usage: node src/calculator.js <op> <num1> <num2>');
  console.error('Where <op> is one of: add, sub, mul, div');
  console.error('Examples:');
  console.error('  node src/calculator.js add 2 3');
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

// Allow this file to be required as a module
module.exports = { add, sub, mul, div };

// If invoked directly, run the CLI
if (require.main === module) {
  const [, , op, aRaw, bRaw] = process.argv;

  if (!op || aRaw === undefined || bRaw === undefined) {
    printUsage();
    process.exitCode = 1; // invalid usage
    process.exit(1);
  }

  const a = parseNumber(aRaw);
  const b = parseNumber(bRaw);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers.');
    process.exitCode = 1;
    process.exit(1);
  }

  let result;

  switch (op.toLowerCase()) {
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

  // Print result to stdout for easy scripting
  if (result !== undefined) {
    // If result is an integer, print without trailing .0
    if (Number.isInteger(result)) {
      console.log(result);
    } else {
      console.log(result);
    }
    process.exit(0);
  }
}
