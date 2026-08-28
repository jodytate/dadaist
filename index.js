const fs = require('fs');
const os = require('os');
const path = require('path');
const shuffle = require('./libs/shuffle.js')
const sw = require('stopword');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
  .option('file', {
    type: 'string',
    demandOption: true,
    description: 'Path to the source text file'
  })
  .parse()

const date = new Date();
const formattedDate = date.toLocaleString();       // -> "2/1/2013 7:37:08 AM"
const dateStamp = [
  String(date.getMonth() + 1).padStart(2, '0'),
  String(date.getDate()).padStart(2, '0'),
  date.getFullYear()
].join('');

const dada = function dada (array) {
  const output = [];
  array.forEach(function (chunk) {
    output.push(chunk);
  });
  return output.join(' ');
}

const inputFile = path.resolve(__dirname, argv.file);
const input = fs.readFileSync(inputFile, 'utf8');
const splitUp = input.match(/\S+/g) || [];
const stopFiltered = sw.removeStopwords(splitUp);
const shuffled = shuffle(stopFiltered);
const newDada = dada(shuffled);

const outputDirectory = path.join(__dirname, 'outputs');
fs.mkdirSync(outputDirectory, { recursive: true });
const outputNumber = fs.readdirSync(outputDirectory)
  .map((fileName) => fileName.match(new RegExp(`^output-${dateStamp}-(\\d+)\\.txt$`)))
  .filter(Boolean)
  .reduce((highestNumber, match) => Math.max(highestNumber, Number(match[1])), 0) + 1;
const outputFile = path.join(outputDirectory, `output-${dateStamp}-${outputNumber}.txt`);
const prependText = `${formattedDate} ${os.EOL} ${os.EOL}`;

fs.writeFile(outputFile, prependText + newDada, 'utf8', (error) => {
  if (error) {
    console.error(error);
    process.exitCode = 1;
  } else {
    console.log('file saved');
  }
});
