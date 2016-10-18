const spawn = require('child_process').spawn;

let child = spawn('sh', ['-c',
    `node -e "setInterval(() => {
      console.log(process.pid + ' is alive')
    }, 500);"`
], {
        stdio: ['inherit', 'inherit', 'inherit']
    });

child.on('close', (code, signal) => {
  console.log(
    `child process terminated due to receipt of signal ${signal}`);
});


setTimeout(() => {
    child.kill('SIGKILL'); 
}, 2000);