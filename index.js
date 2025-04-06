const fs = require('fs');
const os = require('os');
const prependFile = require('prepend-file');
const shuffle = require('./libs/shuffle.js')
const sw = require('stopword');

const date = new Date();
const timestamp = Date.now();
const formattedDate = date.toLocaleString();       // -> "2/1/2013 7:37:08 AM"


const dada = function dada (array) {
  const output = [];
  array.forEach(function (chunk) {
    output.push(chunk);
  });
  return output.join(' ');
}

const input = fs.readFileSync(__dirname + '/test.txt', 'utf8').toString();
const noLineBreaks = input.replace(/(\r\n|\n|\r)/gm, '');
const splitUp = noLineBreaks.split(' ');
const stopFiltered = sw.removeStopwords(splitUp);
const shuffled = shuffle(stopFiltered);
const newDada = dada(shuffled);

const outputFile = `outputs/output-${timestamp}.txt`

fs.writeFile(outputFile, newDada, encoding='utf8', (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('file saved');
  }
});

const prependText = `${formattedDate} ${os.EOL} ${os.EOL}`;

prependFile(outputFile, prependText, encoding='utf8', function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log('file prepended');
  }
});
