import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ERROR,
  chooseOperator,
  equals,
  formatResult,
  initialState,
  inputDigit,
  inputDot,
  percent,
  toggleSign,
} from '../src/utils/calculator.js';

// Presses keys the way the buttons do ("12" types 1 then 2) and returns what the display shows.
function press(sequence) {
  let state = initialState();
  for (const key of sequence.split(' ')) {
    if (/^[\d.]+$/.test(key)) {
      for (const char of key) state = char === '.' ? inputDot(state) : inputDigit(state, char);
    } else if (key === '=') {
      state = equals(state);
    } else if (key === '±') {
      state = toggleSign(state);
    } else if (key === '%') {
      state = percent(state);
    } else {
      state = chooseOperator(state, key);
    }
  }
  return state.current || '0';
}

test('chained operations keep the running total', () => {
  assert.equal(press('2 + 3 + 4 ='), '9');
  assert.equal(press('10 − 4 × 2 ='), '12');
});

test('a decimal point right after an operator starts a new number', () => {
  assert.equal(press('.1 + .2 ='), '0.3');
  assert.equal(press('1 + .5 ='), '1.5');
});

test('results are rounded to hide floating-point noise and fit the display', () => {
  assert.equal(press('0.1 + 0.2 ='), '0.3');
  assert.equal(formatResult(1 / 3), '0.333333333333');
  assert.equal(formatResult(123456789 * 987654321), '1.219326e+17');
});

test('typing after an error or a result starts a fresh entry', () => {
  assert.equal(press('1 ÷ 0 ='), ERROR);
  assert.equal(press('1 ÷ 0 = 5'), '5');
  assert.equal(press('2 + 3 = 4'), '4');
  assert.equal(press('2 + 3 = + 1 ='), '6');
});

test('operators can be swapped, and = reuses the entry when no second number was typed', () => {
  assert.equal(press('5 + × 3 ='), '15');
  assert.equal(press('9 × ='), '81');
});

test('sign, percent and the entry length limit', () => {
  assert.equal(press('5 ±'), '-5');
  assert.equal(press('5 ± ±'), '5');
  assert.equal(press('0 ±'), '0');
  assert.equal(press('50 %'), '0.5');
  assert.equal(press('1 ÷ 0 = %'), ERROR);
  assert.equal(press('12345678901234567'), '1234567890123456');
});
