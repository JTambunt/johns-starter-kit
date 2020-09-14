import { combineReducers } from 'redux';

import UserSessionReducer from './ducks/UserSessionDuck';
import PostsReducer from './ducks/PostsDuck';

import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
    userSession: UserSessionReducer,
    posts: PostsReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});
