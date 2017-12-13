import { combineReducers } from 'redux';
import communicationReducer from 'reducers/communicationReducer';
import peopleReducer from 'reducers/peopleReducer';
import userState from 'reducers/userStateReducer';

const chatReducer = combineReducers({
    userState,
    peopleReducer,
    communicationReducer
});

export default chatReducer;