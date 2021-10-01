import * as firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC0oICYq48CDr69YDjmrCjWR-DoKb5YwaA",
    authDomain: "react-proyect-fb.firebaseapp.com",
    projectId: "react-proyect-fb",
    storageBucket: "react-proyect-fb.appspot.com",
    messagingSenderId: "945947132455",
    appId: "1:945947132455:web:32da407abe583e2f904402"
};

const app = firebase.initializeApp(firebaseConfig);

export const getFirebase = () => {
    return app;
}

export const db = getFirestore(app);
