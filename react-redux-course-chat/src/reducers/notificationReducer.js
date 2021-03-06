const INITIAL_STATE = { message: null };

const notificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SEND_NOTIFICATION":
            return { ...state, message: action.message };
        case "STOP_NOTIFICATION":
            return { ...state, message: ""}
    }

    return state;
};

export default notificationReducer;