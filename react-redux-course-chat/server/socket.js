const server = require("./server");

const io = require('socket.io')(server);
const socketioJwt = require('socketio-jwt');

let clients = [];
io.sockets.on('connection', socketioJwt.authorize({
    secret: 'mySecretKey',
    callback: 15000
})).on('authenticated', function (socket) {
    clients.push(socket);
    socket.emit('Introduction', socket.decoded_token);
    console.log(socket.decoded_token.username + ' has connected to the chat.');

    socket.on('disconnect', function () {
        console.log(socket.decoded_token.username + ' has left the chat.');

        let i = clients.indexOf(socket);
        clients.splice(i, 1);
    });
});

module.exports = io;