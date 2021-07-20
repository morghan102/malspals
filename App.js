import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import * as firebase from 'firebase'; // i may want to remove the other imports 
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Initialize Firebase. I cannot find these values
const firebaseConfig = {
    apiKey: "AIzaSyDAPKZZPwH4byxTWnHMawwCnsbufZvpuKk",
    // authDomain: "<your-auth-domain>",
    // databaseURL: "<your-database-url>",
    // storageBucket: "<your-storage-bucket>",
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);

//this is from the react app for making chat comp
// firebase.initializeApp({

// })

const auth = firebase.auth();
const firestore = firebase.firestore();

const store = ConfigureStore();

export default function App() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}