import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC-IBXsZJYqC53NfG7e01sLOP-iEMSq-Ss',
  authDomain: 'pilkarzyki-3adbb.firebaseapp.com',
  projectId: 'pilkarzyki-3adbb',
  storageBucket: 'pilkarzyki-3adbb.appspot.com',
  messagingSenderId: '242577815355',
  appId: '1:242577815355:web:38fa9006f1119acc83291e',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
