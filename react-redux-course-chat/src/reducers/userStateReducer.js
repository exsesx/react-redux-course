const userState = (state = {}, action) => {
    if(action.type === "USER_LOGGED_IN") {
        return state = {
            signedIn: true,
            username: action.username
        };
    }
    if(action.type === "USER_LOGOUT") {
        return state = {};
    }
    return state;
};

export default userState;