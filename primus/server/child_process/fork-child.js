process.on('message', (m, socket) => {
    console.log('child got message', m)
    if (m === 'socket') {
        socket.end(`Request handled with ${process.argv[2]} priority`);
    }
});
