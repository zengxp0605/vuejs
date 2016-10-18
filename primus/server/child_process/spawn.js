const spawn = require('child_process').spawn;
// const ls = spawn('ls', ['-lh', '/usr']);

//const opts = { stdio: 'inherit' }; //// Child will use parent's stdios
const opts = { stdio: 'pipe' };
// const opts = {
//   detached: true,  // 允许子进程独立允许
//   stdio: 'ignore',
// };

let fileName = __dirname + '/curlTest.js';
const child = spawn('node', [fileName], opts);

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

