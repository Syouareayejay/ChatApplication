import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBROHcZi6Hdy8_PBmfQ2JMYAkdNjYvx1Yw",
    authDomain: "chatapplication-9bae6.firebaseapp.com",
    projectId: "chatapplication-9bae6",
    storageBucket: "chatapplication-9bae6.appspot.com",
    messagingSenderId: "587738288308",
    appId: "1:587738288308:web:b84c0996eb7fe42b6207e1"
  }).auth();