const peopleReducer = (state = [], action) => {
    switch (action.type) {
        case "CONNECTED_NEW_USER":
            return state.concat({
                _id: action._id,
                username: action.username
            });
        case "DISCONNECTED_USER":
            return state.filter(u => {
                return u.id !== action.userID
            });
        case "INIT_USERS":
            return state = action.users;
        default:
            return state
    }
};

export default peopleReducer;