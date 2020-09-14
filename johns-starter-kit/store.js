import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore } from 'redux-firestore';
import logger from 'redux-logger';

import Environment from './constants/Environment';
import rootReducer from './rootReducer';
import Firebase from './config/Firebase';

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

let applyMiddlewareObj;

if (Environment.LOGGER) {
    applyMiddlewareObj = applyMiddleware(thunk, logger);
} else {
    applyMiddlewareObj = applyMiddleware(thunk);
}

export const store = createStore(
    rootReducer,
    {},
    compose(applyMiddlewareObj, reduxFirestore(Firebase, rrfConfig))
);
