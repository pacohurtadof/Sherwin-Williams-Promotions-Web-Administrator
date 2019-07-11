import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// oscarreyes.skynet@gmail.com
var fbConfig = {
    apiKey: "AIzaSyCGR-mjFzNuf0ilPaqtG2bC-tcHQP2lqDc",
    authDomain: "react-test-55b05.firebaseapp.com",
    databaseURL: "https://react-test-55b05.firebaseio.com",
    projectId: "react-test-55b05",
    storageBucket: "react-test-55b05.appspot.com",
    messagingSenderId: "312532913883"
};

firebase.initializeApp(fbConfig);

export default firebase;