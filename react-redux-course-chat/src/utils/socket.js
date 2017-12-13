import io from 'socket.io-client';
import store from 'store';
import { userLoggedIn, userLogout, connectedNewUser, initUsers, getConversations } from 'actions';

const { dispatch } = store;

const socketUrl = "http://localhost:3000";
export default class Socket {
    constructor() {
        this.socket = null;
    }

    static init() {
        if (this.socket) {
            console.warn("Socket is already initialized, reconnecting...");
            this.socket.disconnect();
        }

        this.socket = io.connect(socketUrl);

        const socket = this.socket;

        socket.on('connect', function () {
            socket.emit('authenticate', { token: localStorage.getItem('chatToken') }) //send the jwt
                .on('authenticated', function () {
                    console.warn("User successfully authenticated");

                    socket.on('Introduction', function (user) {
                        console.log(user);
                        if (user) {
                            dispatch(userLoggedIn(user));
                        }
                    });

                    socket.on('connectedNewUser', function (user) {
                        console.log('Connected new user', user);
                        dispatch(connectedNewUser(user))
                    });

                    socket.on('users:got:not-current', function (users) {
                        // todo: what if an error occurs ?
                        if (users) {
                            dispatch(initUsers(users));
                        }
                    });

                    socket.on('user:got', function(user) {
                        if(user) {
                            console.log(user);
                        }
                    });

                    socket.on("conversation:created", function(conversation) {
                        if(conversation) console.log(conversation);
                        else console.log("error while creating conversation")
                    });

                    socket.on("conversations:got", function (conversations) {
                        if (conversations) {
                            console.log(conversations);
                            dispatch(getConversations(conversations))
                        }
                        else console.log("You have not conversations yet");

                    });

                    socket.on("conversation:got", function(conversation) {
                        console.log(conversation);
                    });

                    socket.on("chatControllerError", function (err) {
                        console.error(err.message);
                    });
                })
                .on('unauthorized', function (error) {
                    console.error("Unauthorized: " + error.data.message);
                    dispatch(userLogout());
                    return error.data;
                })
        });
    }

    static emit(message, ...params) {
        const socket = this.socket;

        if (!socket) {
            return console.error("You must initialize socket before using emit!");
        }

        console.warn("emitting: ", message, params);
        socket.emit(message, ...params);
    }
}