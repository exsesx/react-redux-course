const userState = (state = {}, action) => {
    if(action.type === "USER_LOGGED_IN") {
        return state = {
            _id: action._id,
            username: action.username,
            signedIn: true
        };
    }
    if(action.type === "USER_LOGOUT") {
        return state = {};
    }
    return state;
};

export default userState;