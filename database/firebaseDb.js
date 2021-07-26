import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

// <!-- The core Firebase JS SDK is always required and must be listed first -->
{/* <script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js"></script> */}

// <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
{/* <script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-analytics.js"></script> */}

  {/* // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional */}
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
  {/* // Initialize Firebase */}
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  firebase.firestore();

export default firebase;