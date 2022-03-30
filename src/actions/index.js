export const userLoggedIn = ({ _id, username }) => {
    return {
        type: 'USER_LOGGED_IN',
        username,
        _id
    }
};

export const connectedNewUser = ({ _id, username }) => {
    return {
        type: "CONNECTED_NEW_USER",
        _id,
        username
    }
};

export const userLogout = () => {
    localStorage.removeItem('chatToken');
    return {
        type: 'USER_LOGOUT'
    }
};

export const sendNotification = (message) => {
    return {
        type: "SEND_NOTIFICATION",
        message
    }
};

export const stopNotification = () => {
    return {
        type: "STOP_NOTIFICATION"
    }
};

export const setCurrentMessage = (message) => {
    return {
        type: "SET_CURRENT_MESSAGE",
        message
    }
};

export const initUsers = (users) => {
    return {
        type: "INIT_USERS",
        users
    }
};

//= ===============================
// Messaging actions
//= ===============================
export const getConversations = ({ conversations }) => {
    return {
        type: "GET_CONVERSATIONS",
        conversations
    }
};

export function startConversation({ recipient, message }) {
    return {
        type: "START_CONVERSATION",
        recipient,
        message
    }
}

export function setActiveConversation(conversation) {
    return {
        type: "SET_ACTIVE_CONVERSATION",
        conversation
    }
}

export function receiveMessage(message) {
    return {
        type: "RECEIVE_MESSAGE",
        message
    }
}

export function setMessages(messages) {
    return {
        type: "SET_MESSAGES",
        messages
    }
}