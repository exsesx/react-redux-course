const server = require("./server");

const io = require('socket.io')(server);
const socketioJwt = require('socketio-jwt');

let socketioJwtAuthorize = socketioJwt.authorize({
    secret: 'lololo',
    handshake: true
});

io.use(function (socket, next) {
    socketioJwtAuthorize(socket.request, function (error, success) {
        if (success) {
            socket.payload = socket.request.decoded_token;
            console.log("Success authorization");
            console.log(socket.request.decoded_token);
            next();
        } else {
            console.log("Unauthorized");
            next(new Error("unauthorized"));
        }
    })
});

io.sockets.on('connection', function (socket) {
    socket.emit('Introduction', {payload: socket.payload});
    socket.on('users:get', function () {
        socket.emit('users:got', {users: ["qwerty", "qwerty2"]})
    })
});

module.exports = io;