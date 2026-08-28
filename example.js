const dadaist = require('./index.js');

const words = [
  'a', 'newspaper', 'cuts', 'the', 'poem', 'into', 'shards', 'of', 'chance'
];

const shuffled = dadaist.cutShakeGently(words);

console.log('Original:', words.join(' '));
console.log('Shuffled:', shuffled.join(' '));
