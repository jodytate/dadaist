const fs = require('fs');
const moment = require('moment');
const shuffle = require('./libs/shuffle.js')
const sw = require('stopword');


const dada = function dada (array) {
  const output = [];
  array.forEach(function (chunk) {
    output.push(chunk);
  });
  return output.join(' ');
}

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8').toString();
const noLineBreaks = input.replace(/(\r\n|\n|\r)/gm, '');
const splitUp = noLineBreaks.split(' ');
const stopFiltered = sw.removeStopwords(splitUp);
const shuffled = shuffle(stopFiltered);
const newDada = dada(shuffled);

fs.writeFile('output.txt', newDada, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('file saved');
  }
}); 