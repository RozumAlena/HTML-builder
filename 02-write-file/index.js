const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'result.txt'));
const { stdin, stdout } = process;
const readline = require('readline');

stdout.write('Hello!Enter your text:');

const rl = readline.createInterface(stdin);
rl.on('line', (str) => {
  if (str === 'exit') {
                process.exit();
            } else {
                output.write(`${str}\n`);
            }
        });
process.on('SIGINT', () => process.exit());
process.on('exit', () => console.log('See you!'));