var program = require('commander');

program
  .option('-w, --worker <n>', 'Worker file to run.')
  .parse(process.argv);
// console.log('program:', program);
if(!program.worker.endsWith('.js'))
  program.worker += '.js';

// console.log(__dir);
console.log('start worker:', program.worker);

var fs = require('fs');
if(!fs.existsSync('server/workers/' + program.worker)) {
  console.error('File not found.');
  process.exit(1);
}

require('babel-register');
require('babel-polyfill');
require('./' + program.worker);
