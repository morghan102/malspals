import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import * as firebase from 'firebase'; // i may want to remove the other imports 
import 'firebase/firestore';
import 'firebase/auth';
import { AppRegistry } from 'react-native';


// Initialize Firebase. I cannot find these values
  var firebaseConfig = {
    apiKey: "AIzaSyDAPKZZPwH4byxTWnHMawwCnsbufZvpuKk",
    authDomain: "malspals-723a3.firebaseapp.com",
    databaseURL: "https://malspals-723a3-default-rtdb.firebaseio.com",
    projectId: "malspals-723a3",
    storageBucket: "malspals-723a3.appspot.com",
    messagingSenderId: "194718958525",
    appId: "1:194718958525:web:71c6f532b33a8cbeaa88d4",
    measurementId: "G-030JE7J6F8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// //this is from the react app for making chat comp
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