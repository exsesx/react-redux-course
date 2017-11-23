const server = require("./server");

const io = require('socket.io')(server);
const socketioJwt = require('socketio-jwt');

io.sockets.on('connection', socketioJwt.authorize({
    secret: 'mySecretKey',
    callback: 15000
})).on('authenticated', function (socket) {
    socket.emit('Introduction', socket.decoded_token);
    console.log('User ' + socket.decoded_token.username + ' has connected to the chat.');

    socket.on('disconnect', function () {
        console.log('User ' + socket.decoded_token.username + ' has left the chat.');
    });
});

module.exports = io;