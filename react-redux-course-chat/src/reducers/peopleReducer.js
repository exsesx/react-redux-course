const peopleReducer = (state = [], action) => {
    switch (action.type) {
        case "CONNECTED_NEW_USER":
            return state.concat({
                id: action.userID,
                userName: action.userName,
                userColor: action.userColor
            });
        case "DISCONNECTED_USER":
            return state.filter(u => {
                return u.id !== action.userID
            });
        case "INIT_USERS":
            return state.concat([], action.users);
        default:
            return state
    }
};

export default peopleReducer;