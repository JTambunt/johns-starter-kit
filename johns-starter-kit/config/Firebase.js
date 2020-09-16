import firebase from 'firebase';
import 'firebase/firestore';

import { firebaseConfig } from './Secrets';

const firebaseCredentials = {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    databaseURL: firebaseConfig.databaseURL,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
    measurementId: firebaseConfig.measurementId,
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseCredentials);

export const db = firebase.firestore();

export default Firebase;
