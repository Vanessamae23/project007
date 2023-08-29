import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { setBalance } from "../../redux/balance-slice";
import { getData } from "../../utils/localStorage";
import { useDispatch } from "react-redux";

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

export const useListenForBalance = () => {
  const dispatch = useDispatch();
  getData('user').then(res => {
    const uid = res.uid;
    const balanceRef = ref(db, 'balance/' + uid + '/value/');
    onValue(balanceRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(setBalance(Number(data)));
      } else {
        set(ref(db, 'balance/' + uid), {
          value: 0,
        })
        dispatch(setBalance(0));
      }
    });
  })
}

export const dbSetBalance = (newValue) => {
  getData('user').then(res => {
    const uid = res.uid;
    const balanceRef = ref(db, 'balance/' + uid + '/value/');
    set(balanceRef, newValue);
  });
};