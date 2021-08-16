import * as firebase from 'firebase';
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    MESSAGE_SENDER_ID,
    APP_ID
} from '@env'; //importing as so from the .env file allows us to store sensitive api keys

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: "malspals-723a3.appspot.com",
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID,
    measurementId: "G-030JE7J6F8"
};



// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase;