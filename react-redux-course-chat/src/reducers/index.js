import { combineReducers } from 'redux';
import messagesReducer from 'reducers/messagesReducer';
import peopleReducer from 'reducers/peopleReducer';
import userState from 'reducers/userStateReducer';

const chatReducer = combineReducers({
    userState,
    peopleReducer,
    messagesReducer
});

export default chatReducer;