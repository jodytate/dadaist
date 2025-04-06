const fs = require('fs');
const moment = require('moment');
const os = require('os');
const prependFile = require('prepend-file');
const shuffle = require('./libs/shuffle.js')
const sw = require('stopword');

const fileTimestamp = moment().toISOString();
const humanTimestamp = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

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

const outputFile = `outputs/output-${fileTimestamp}.txt`

fs.writeFile(outputFile, newDada, encoding='utf8', (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('file saved');
  }
});

const prependText = `${humanTimestamp} ${os.EOL} ${os.EOL}`;

prependFile(outputFile, prependText, encoding='utf8', function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log('file prepended');
  }
});
