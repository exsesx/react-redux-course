const INITIAL_STATE = { conversations: [], message: '', messages: [], recipients: [], error: '' };

const communicationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_CONVERSATIONS":
            return { ...state, conversations: action.conversations };
        case "FETCH_SINGLE_CONVERSATION":
            return { ...state, messages: action.payload.conversation };
        case "FETCH_RECIPIENTS":
            return { ...state, recipients: action.payload.recipients };
        case "START_CONVERSATION":
            return { ...state, message: action.payload.message };
        case "SEND_REPLY":
            return { ...state, message: action.payload.message };
        case "CHAT_ERROR":
            return { ...state, error: action.payload };
    }

    return state;
};

export default communicationReducer;