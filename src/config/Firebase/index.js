import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import firebase from "firebase/app";

const app = initializeApp( {
  apiKey: "AIzaSyCthCLpRtnMG4DipEkBAUqHrDzi_H3NjgM",
  authDomain: "tiktok-1d4b9.firebaseapp.com",
  databaseURL: "https://tiktok-1d4b9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tiktok-1d4b9",
  storageBucket: "tiktok-1d4b9.appspot.com",
  messagingSenderId: "1057965972778",
  appId: "1:1057965972778:web:8e44b479427f68b7475253",
  measurementId: "G-TDRPMJ1JVD"
})


export const auth = getAuth(app);
export const db = getDatabase(app);
// export default Firebase

