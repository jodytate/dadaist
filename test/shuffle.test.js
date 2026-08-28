const assert = require('node:assert/strict');
const test = require('node:test');
const dadaist = require('../index.js');
const { cutShakeGently } = dadaist;

test('returns a shuffled copy without mutating the input', () => {
  const input = ['a', 'b', 'c', 'd'];
  const result = cutShakeGently(input, () => 0);

  assert.deepEqual(result, ['b', 'c', 'd', 'a']);
  assert.deepEqual(input, ['a', 'b', 'c', 'd']);
  assert.notStrictEqual(result, input);
});

test('returns empty and single-item arrays unchanged', () => {
  assert.deepEqual(cutShakeGently([]), []);
  assert.deepEqual(cutShakeGently(['only']), ['only']);
});

test('produces a permutation of the input', () => {
  const input = ['one', 'two', 'three', 'four'];
  const result = cutShakeGently(input);

  assert.equal(result.length, input.length);
  assert.deepEqual([...result].sort(), [...input].sort());
});

test('rejects a non-array input', () => {
  assert.throws(() => cutShakeGently('not an array'), {
    name: 'TypeError',
    message: 'cutShakeGently expects an array'
  });
});

test('rejects a non-function random generator', () => {
  assert.throws(() => cutShakeGently([], 42), {
    name: 'TypeError',
    message: 'cutShakeGently expects a random function'
  });
});
