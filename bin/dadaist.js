#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const { Command } = require('commander');
const sw = require('stopword');
const { cutShakeGently } = require('../index.js');

function runDadaist(options = {}) {
  const { file, cwd = process.cwd() } = options;
  const date = new Date();
  const formattedDate = date.toLocaleString();
  const dateStamp = [
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    date.getFullYear()
  ].join('');

  const dada = function dada(array) {
    const output = [];
    array.forEach(function(chunk) {
      output.push(chunk);
    });
    return output.join(' ');
  };

  const inputFile = path.resolve(cwd, file);
  const input = fs.readFileSync(inputFile, 'utf8');
  const splitUp = input.match(/\S+/g) || [];
  const stopFiltered = sw.removeStopwords(splitUp);
  const shuffled = cutShakeGently(stopFiltered);
  const newDada = dada(shuffled);

  const outputDirectory = path.join(cwd, 'outputs');
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
}

if (require.main === module) {
  const program = new Command();

  program
    .name('dadaist')
    .description('Generate Dadaist poetry from a text file')
    .requiredOption('-f, --file <path>', 'Path to the source text file')
    .action((options) => {
      runDadaist({ file: options.file, cwd: process.cwd() });
    });

  program.parse(process.argv);
}

module.exports = { runDadaist };
