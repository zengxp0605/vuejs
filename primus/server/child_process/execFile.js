
const execFile = require('child_process').execFile;

let fileName = __dirname + '/curlTest.js';
const child = execFile('node', [fileName], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    //console.log(stdout);
});