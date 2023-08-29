import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { setBalance } from "../../redux/balance-slice";
import { getData } from "../../utils/localStorage";
import { useDispatch } from "react-redux";

const app = initializeApp({
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.PUBLIC_MEASUREMENT_ID,
});

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
