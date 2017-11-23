import io from 'socket.io-client';
import store from 'store';
import { userLoggedIn, userLogout } from 'actions';

const { dispatch } = store;

const socketUrl = "http://localhost:3000";
export const connect = () => {
    const socket = io.connect(socketUrl);

    socket.on('connect', function () {
        socket
            .emit('authenticate', { token: localStorage.getItem('chatToken') }) //send the jwt
            .on('authenticated', function () {
                console.warn("User successfully authenticated");

                socket.on('Introduction', function (user) {
                    console.log(user);
                    if (user) {
                        dispatch(userLoggedIn(user));
                    }
                })
            })
            .on('unauthorized', function (error) {
                console.error("Unauthorized: " + error.data.message);
                dispatch(userLogout());
                return error.data;
            })
    });

    const emit = (message) => {
        socket.emit(message);
    };

    return { emit };
};

connect();