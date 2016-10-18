const filePath = __dirname + '/';
const normal = require('child_process').fork(filePath + 'fork-child.js', ['normal']);
const special = require('child_process').fork(filePath + 'fork-child.js', ['special']);

// Open up the server and send sockets to child
const server = require('net').createServer();
server.on('connection', (socket) => {
    console.log(111111111);

    // If this is special priority
    if (socket.remoteAddress === '74.125.127.100') {
        special.send('socket', socket);
        return;
    }
    console.log(22222222);
    // This is normal priority
    normal.send('socket', socket);
});


normal.on('message', (m) => {
    console.log('PARENT got message:', m);
});

setTimeout(() => {
    normal.send({ hello: 'world -- normal' });
    special.send({ hello: 'world -- special' });
}, 2000)

server.listen(1337);