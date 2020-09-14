import firebase from 'firebase';
import 'firebase/firestore';

import { firebaseCredentials } from './Secrets';

const firebaseConfig = {
    apiKey: firebaseCredentials.apiKey,
    authDomain: firebaseCredentials.authDomain,
    databaseURL: firebaseCredentials.databaseURL,
    projectId: firebaseCredentials.projectId,
    storageBucket: firebaseCredentials.storageBucket,
    messagingSenderId: firebaseCredentials.messagingSenderId,
    appId: firebaseCredentials.appId,
    measurementId: firebaseCredentials.measurementId,
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default Firebase;
