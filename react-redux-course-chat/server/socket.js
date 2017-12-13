const server = require("./server");
const User = require("./db/model/User");
const ChatController = require("./chatController");

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

    socket.on('user:get', function(userName) {
        User.getUserByUsername(userName, (err, user) => {
            if(err) throw err;
            socket.emit('user:got', user);
        })
    });

    socket.on('users:get:not-current', function () {
        User.getAllUsersExceptCurrent(socket.decoded_token, (err, users) => {
            if (err) throw err;
            socket.emit('users:got:not-current', users);
        });
    });

    socket.on('conversations:get', () => {
        ChatController.getConversations(socket.decoded_token, (err, conversations) => {
            if (err) socket.emit("chatControllerError", err);
            socket.emit('conversations:got', conversations);
        });
    });

    socket.on('conversation:create', (recipient, message) => {
        console.log(recipient, message);
        ChatController.newConversation(socket.decoded_token, recipient, message, (err, conversation) => {
            if (err) socket.emit("chatControllerError", err);
            socket.emit('conversation:created', conversation);
        })
    });

    socket.on('conversation:get', (conversationId) => {
        ChatController.getConversation(conversationId, (err, conversation) => {
            if (err) throw err;
            socket.emit('conversation:got', conversation);
        })
    });

    socket.on('conversation:delete', (conversationId) => {
        ChatController.deleteConversation(conversationId, socket.decoded_token, (err, conversation) => {
            if (err) throw err;
            socket.emit('conversation:deleted', conversation);
        })
    });

    socket.on('conversation:reply', (conversationId, message, user) => {
        ChatController.sendReply(conversationId, message, user, (err, conversation) => {
            if (err) throw err;
            socket.emit('conversation:replied', conversation);
        })
    });

    socket.on('conversation:enter', (conversation) => {
        socket.join(conversation);
        console.log('joined ' + conversation);
    });

    socket.on('conversation:leave', (conversation) => {
        socket.leave(conversation);
        console.log('left ' + conversation);
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