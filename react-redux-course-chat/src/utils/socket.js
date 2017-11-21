import io from 'socket.io-client';
import store from 'store';
import { userLoggedIn } from 'actions';

const { dispatch } = store;

const socketUrl = "http://localhost:3000";
export const connect = () => {
    const socket = io.connect(socketUrl, {
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

    socket.on('gotUser', function (data) {
        console.log('You are:', data);
    });

    socket.on('Introduction', function (user) {
        console.log(user);
        if(user) {
            dispatch(userLoggedIn(user));
        }
    });

    const emit = (message) => {
        socket.emit(message);
    };

    return { emit };
};

connect();