import io from 'socket.io-client';

const socket = io.connect("http://localhost:3000", {
    query: 'token=' + localStorage.getItem('chatToken')
});

socket.on('error', function (error) {
    console.log(error);
    if (error === 'unauthorized') {
        console.log('Go to login');
    }
});

socket.on('connect', function () {
    console.warn('You are connected to WebSocket');
});

socket.on('users:got', function (data) {
    console.log('Users', data);
});

socket.on('Introduction', function (data) {
    console.log(data);
});

const emit = (message) => {
    socket.emit(message);
};

export {socket, emit};