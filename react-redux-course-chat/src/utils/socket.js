import io from 'socket.io-client';
import store from 'store';
import {userLoggedIn} from 'actions';

const {dispatch} = store;

const socket = io.connect("http://localhost:3000", {
    query: 'token=' + localStorage.getItem('chatToken')
});

export function connectToWs() {
    io.connect("http://localhost:3000", {"force new connection": true,  query: 'token=' + localStorage.getItem('chatToken')});
}

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

socket.on('gotUser', function(data) {
    console.log('You are:', data);
});

socket.on('Introduction', function (user) {
    console.log(user);
    dispatch(userLoggedIn(user));
});

const emit = (message) => {
    socket.emit(message);
};

export { socket, emit };