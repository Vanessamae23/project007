

import firebase from 'firebase'

//setting it up
firebase.initializeApp({
    apiKey: "AIzaSyCthCLpRtnMG4DipEkBAUqHrDzi_H3NjgM",
    authDomain: "tiktok-1d4b9.firebaseapp.com",
    projectId: "tiktok-1d4b9",
    storageBucket: "tiktok-1d4b9.appspot.com",
    messagingSenderId: "1057965972778",
    appId: "1:1057965972778:web:8e44b479427f68b7475253",
    measurementId: "G-TDRPMJ1JVD",
    databaseURL: "https://tiktok-1d4b9-default-rtdb.asia-southeast1.firebasedatabase.app/"
})

// making a variable that we can use
const Firebase = firebase
export default Firebase