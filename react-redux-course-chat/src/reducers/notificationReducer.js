const INITIAL_STATE = { message: null };

const notificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CONVERSATION_CREATING":
            return { ...state, message: action.message };
    }

    return state;
};

export default notificationReducer;