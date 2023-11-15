import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDq4JRbSKqxyQrSMziaIhydX4pcC6oSyF0",
    authDomain: "donation-blockchain-system.firebaseapp.com",
    projectId: "donation-blockchain-system",
    storageBucket: "donation-blockchain-system.appspot.com",
    messagingSenderId: "1016975798240",
    appId: "1:1016975798240:web:2df87cb052aff0e65c8585"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default getFirestore(app);