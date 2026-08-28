const assert = require('node:assert/strict');
const test = require('node:test');
const shuffle = require('../libs/shuffle.js');

test('returns a shuffled copy without mutating the input', () => {
  const input = ['a', 'b', 'c', 'd'];
  const result = shuffle(input, () => 0);

  assert.deepEqual(result, ['b', 'c', 'd', 'a']);
  assert.deepEqual(input, ['a', 'b', 'c', 'd']);
  assert.notStrictEqual(result, input);
});

test('returns empty and single-item arrays unchanged', () => {
  assert.deepEqual(shuffle([]), []);
  assert.deepEqual(shuffle(['only']), ['only']);
});

test('produces a permutation of the input', () => {
  const input = ['one', 'two', 'three', 'four'];
  const result = shuffle(input);

  assert.equal(result.length, input.length);
  assert.deepEqual([...result].sort(), [...input].sort());
});

test('rejects a non-array input', () => {
  assert.throws(() => shuffle('not an array'), {
    name: 'TypeError',
    message: 'shuffle expects an array'
  });
});

test('rejects a non-function random generator', () => {
  assert.throws(() => shuffle([], 42), {
    name: 'TypeError',
    message: 'shuffle expects a random function'
  });
});
