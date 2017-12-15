const INITIAL_STATE = { conversations: [], message: '', messages: [], recipients: [], activeConversation: {} };

const communicationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_CONVERSATIONS":
            return { ...state, conversations: action.conversations };
        case "SET_ACTIVE_CONVERSATION":
            return { ...state, activeConversation: action.conversation };
        case "SET_MESSAGES":
            return { ...state, messages: action.messages };
        case "RECEIVE_MESSAGE":
            return { ...state, messages: state.messages.concat(action.message)};
        case "FETCH_RECIPIENTS":
            return { ...state, recipients: action.payload.recipients };
        case "START_CONVERSATION":
            return { ...state, message: action.payload.message };
        case "SEND_REPLY":
            return { ...state, message: action.payload.message };
    }

    return state;
};

export default communicationReducer;