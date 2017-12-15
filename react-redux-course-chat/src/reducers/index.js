import { combineReducers } from 'redux';
import communicationReducer from 'reducers/communicationReducer';
import peopleReducer from 'reducers/peopleReducer';
import userState from 'reducers/userStateReducer';
import notificationReducer from 'reducers/notificationReducer';

const chatReducer = combineReducers({
    userState,
    peopleReducer,
    communicationReducer,
    notificationReducer
});

export default chatReducer;