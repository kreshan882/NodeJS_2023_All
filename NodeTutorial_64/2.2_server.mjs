//const os= require('os');
//const {add,sub}= require('./math'); 

// import os from 'os';
// import {add,sub}  from './math.js';
// console.log('000000000');
// console.log(os.version());


import { readFile } from 'node:fs';

readFile('./files_k/testFile-----.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

process.on('uncaughtException', err => {
    console.error(`Throw exce: ${err}`)
    process.exit(1);
})