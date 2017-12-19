const server = require("./server");
const User = require("./db/model/User");
const Message = require("./db/model/Message");
const ChatController = require("./chatController");

const io = require('socket.io')(server);
const socketioJwt = require('socketio-jwt');

let clients = [{
    socket: null,
    userId: null
}];

function getSocketIdByUser(userId, clients) {
    return clients.find((c) => {
        if (c.userId === userId) {
            return c;
        }
    })
}

io.sockets.on('connection', socketioJwt.authorize({
    secret: 'mySecretKey',
    callback: 15000
})).on('authenticated', function (socket) {
    let sock = {
        userId: socket.decoded_token._id,
        username: socket.decoded_token.username,
        socketId: socket.id
    };
    clients.push(sock);

    socket.emit('user:authenticated', socket.decoded_token);
    socket.broadcast.emit('new-user:connected', socket.decoded_token.username);
    console.log(socket.decoded_token.username + ' has connected to the chat.');

    socket.on('users:get', function () {
        User.getAllUsers((err, users) => {
            if (err) throw err;
            socket.emit('users:got', users);
        });
    });

    socket.on('user:get', function (userName) {
        User.getUserByUsername(userName, (err, user) => {
            if (err) throw err;
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
            if (err) return socket.emit("chatControllerError", err);
            return socket.emit('conversations:got', conversations);
        });
    });

    socket.on('conversation:create', (recipient, message, conversationName = null) => {
        ChatController.newConversation(socket.decoded_token, recipient, message, conversationName, (err, conversation) => {
            if (err) return socket.emit("chatControllerError", err);
            let onlineUser = getSocketIdByUser(recipient._id, clients);
            if (onlineUser) {
                io.to(onlineUser.socketId).emit('conversation:creation:notify', "User " + socket.decoded_token.username + " created conversation with you");
                io.to(onlineUser.socketId).emit('conversation:created', conversation);
            }
            return socket.emit('conversation:created', conversation);
        })
    });

    socket.on('messages:get', (conversationId) => {
        ChatController.getConversationMessages(conversationId, (err, messages) => {
            if (err) throw err;
            socket.emit('messages:got', messages);
            socket.broadcast.to(conversationId).emit('messages:got', messages)
        })
    });

    socket.on("conversation:get", (conversationId) => {
        ChatController.getConversationMessages(conversationId, (err, messages) => {
            if (err) {
                return socket.emit("chatControllerError", err);
            }
            else {
                socket.emit('messages:got', messages);
                socket.broadcast.to(conversationId).emit('messages:got', messages);
            }
        })
    });

    socket.on('user:conversation-with:get', userId => {
        ChatController.getConversationWithUser(userId, socket.decoded_token, (err, conversations) => {
            if (err) return socket.emit('user:conversation-with:got', err, null);
            return socket.emit('user:conversation-with:got', null, conversations);
        })
    });

    socket.on('conversation:reply', (conversationId, message, user) => {
        ChatController.sendReply(conversationId, message, user, (err, conversation) => {
            if (err) throw err;
            socket.emit('conversation:replied', conversation);
        })
    });

    socket.on('conversation:enter', (conversation) => {
        socket.join(conversation._id);
        console.log('joined ' + conversation._id);
    });

    socket.on('conversation:leave', (conversation) => {
        socket.leave(conversation._id);
        console.log('left ' + conversation._id);
    });

    socket.on("conversation:remove", (conversation) => {
        ChatController.deleteConversation(conversation, socket.decoded_token, (err, success) => {
            if (err) {
                return socket.emit("conversation:removed", err);
            }
            return socket.emit("conversation:removed", success);
        })
    });

    socket.on("message:update", (messageId, newMessage) => {
        ChatController.updateMessage(messageId, newMessage, socket.decoded_token, (err, message) => {
            if (err) {
                return socket.emit("chatControllerError", err);
            }
            return socket.emit("message:updated", message);
        })
    });

    socket.on("messages:get-current", (conversationId) => {
        ChatController.getCurrentMessage(conversationId, socket.decoded_token._id, (err, message) => {
            if (err) {
                return socket.emit("chatControllerError", err);
            }
            return socket.emit("messages:got-current", message);
        })
    });

    socket.on('message:send', (conversation, composedMessage) => {
        let message = new Message({
            conversationId: conversation._id,
            body: composedMessage,
            author: socket.decoded_token
        });

        message.save(function (err, newMessage) {
            if (err) {
                return socket.to(conversation._id).emit("chatControllerError", err);
            }
            let result = Object.assign({}, newMessage);
            result.author = {
                _id: result.author,
                name: socket.decoded_token.username
            };
            return socket.to(conversation._id).emit("message:receive", result);
        });
    });

    socket.on('disconnect', function () {
        console.log(socket.decoded_token.username + ' has left the chat.');

        let i = clients.indexOf(socket);
        clients.splice(i, 1);
    });
});

module.exports = io;