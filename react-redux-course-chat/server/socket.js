const server = require("./server");
const User = require("./db/model/User");
const Message = require("./db/model/Message");
const Conversation = require("./db/model/Conversation");

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

    socket.on('users:get', function () {
        User.getAllUsers((err, users) => {
            if (err) throw err;
            socket.emit('users:got', users);
        });
    });

    socket.on('users:get:not-current', function() {
        User.getAllUsersExceptCurrent(socket.decoded_token, (err, users) => {
            if (err) throw err;
            socket.emit('users:got:not-current', users);
        });
    });

    socket.on('enter conversation', (conversation) => {
        socket.join(conversation);
        // console.log('joined ' + conversation);
    });

    socket.on('leave conversation', (conversation) => {
        socket.leave(conversation);
        // console.log('left ' + conversation);
    });

    socket.on('new message', (conversation) => {
        io.sockets.in(conversation).emit('refresh messages', conversation);
    });

    socket.on('disconnect', function () {
        console.log(socket.decoded_token.username + ' has left the chat.');

        let i = clients.indexOf(socket);
        clients.splice(i, 1);
    });
});

module.exports = io;