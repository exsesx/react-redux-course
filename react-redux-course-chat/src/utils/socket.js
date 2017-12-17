import io from 'socket.io-client';
import store from 'store';
import {
    userLoggedIn,
    userLogout,
    connectedNewUser,
    initUsers,
    getConversations,
    setActiveConversation,
    setMessages,
    receiveMessage,
    creatingConversationNotify
} from 'actions';

const { dispatch } = store;

const socketUrl = "http://192.168.0.105:3000";
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

                    socket.on('user:authenticated', function (user) {
                        if (user) {
                            dispatch(userLoggedIn(user));
                            socket.emit("conversations:get");
                        }
                    });

                    socket.on('user:connected', function (user) {
                        console.log('Connected new user', user);
                    });

                    socket.on('users:got:not-current', function (users) {
                        // todo: what if an error occurs ?
                        if (users) {
                            dispatch(initUsers(users));
                        }
                    });

                    socket.on('user:got', function (user) {
                        console.log(user);
                    });

                    socket.on('user:conversation-with:got', function (err, conversation) {
                        if (err) {
                            console.error(err.message);
                            dispatch(setActiveConversation(null));
                            dispatch(setMessages(null));
                        } else if (conversation) {
                            dispatch(setActiveConversation(conversation));
                            socket.emit("messages:get", conversation._id);
                            socket.emit("conversation:enter", conversation);
                        }
                    });

                    socket.on("conversation:created", function (conversation) {
                        if (conversation) {
                            dispatch(setActiveConversation(conversation));
                            socket.emit("messages:get", conversation._id);
                            socket.emit("conversations:get");
                        }
                    });

                    socket.on("conversation:creation:notify", function (message) {
                        dispatch(creatingConversationNotify(message));
                    });

                    socket.on("conversations:got", function (conversations) {
                        if (conversations) {
                            dispatch(getConversations(conversations))
                        }
                        else console.log("You have not conversations yet");
                    });

                    socket.on("messages:got", function (messages) {
                        console.log("received messages:", messages);
                        if (messages) {
                            dispatch(setMessages(messages));
                        }
                    });

                    socket.on("message:receive", message => {
                        console.log(message);
                        if (message) {
                            dispatch(receiveMessage(message))
                        }
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