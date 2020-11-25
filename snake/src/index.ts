import { exit } from 'process';
import * as readline from 'readline';
let body = '';
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

console.clear();
process.stdin.on('keypress', (str, key) => {

  if (key.name === 'c' && key.ctrl === true) {
    exit(0)
  }
  if (key.name === 'right') {
    body = body + '-'
  }

  if (key.name === 'left') {
    body = body.substring(1);
  }

  if(key.name === 'down') {
    body= '\n' + body;
  }  
  console.clear();
  console.log(body);
})