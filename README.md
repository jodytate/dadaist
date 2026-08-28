# Dadaist

Dada. For Node.js techniques
Dada techniques. For Node.js.

## Installation

```bash
npm install dadaist
```

## Library usage

```js
const { cutShakeGently } = require('dadaist');

const words = ['a', 'newspaper', 'cuts', 'the', 'poem', 'into', 'shards'];
const shuffled = cutShakeGently(words);

console.log(shuffled.join(' '));
```

## CLI usage

```bash
npx dadaist --file ./input.txt
```

This reads the text file, removes stop words, shuffles the remaining terms, and writes the resulting poem to an `outputs/` directory.

## Source of the Technique

> 5\. manifesto on feeble love and bitter love
>
> VIII  
> To make a dadaist poem  
> Take a newspaper.  
> Take a pair of scissors.  
> Choose an article as long as you are planning to make your poem.  
> Cut out the article.  
> Then cut out each of the words that make up this article and put them in a bag.  
> Shake it gently.  
> Then take out the scraps one after the other in the order in which they left the bag.  
> Copy conscientiously.  
> The poem will be like you.  
> And here you are a writer, infinitely original and endowed with a sensibility that is charming though beyond the understanding of the vulgar.  

*Motherwell, The Dado Painters and Poets, pg 5*