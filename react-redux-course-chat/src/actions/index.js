export const userLoggedIn = ({username, password}) => {
    return {
        type: 'USER_LOGGED_IN',
        username,
        password
    }
};

export const userLogout = () => {
    localStorage.removeItem('chatToken');
    return {
        type: 'USER_LOGOUT'
    }
};