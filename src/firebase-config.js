import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config object goes here
  // You can find this in your Firebase Console -> Project Settings
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 