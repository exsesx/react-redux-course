const server = require("./server");

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('user has connected');

    io.emit('Introduction', "You are connected to the webSocket");

    socket.on('disconnect', data => {
        console.log('user disconnected');
    })
});

module.exports = io;