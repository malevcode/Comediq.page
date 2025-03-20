import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBIt5uAwX3jL4B55u4fp1iPFj1kx1JJDMM",
  authDomain: "comediq.firebaseapp.com",
  projectId: "comediq",
  storageBucket: "comediq.firestorage.app",
  messagingSenderId: "651174044928",
  appId: "1:651174044928:web:80561523af676920f5ffe5",
  measurementId: "G-NL8PHY5GCZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);