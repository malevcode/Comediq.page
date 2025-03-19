// Import Firebase Admin SDK
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBIt5uAwX3jL4B55u4fp1iPFjlkx1JJDMM",
    authDomain: "comediq.firebaseapp.com",
    projectId: "comediq",
    storageBucket: "comediq.firebasestorage.app",
    messagingSenderId: "651174044928",
    appId: "1:651174044928:web:80561523af676920f5ffe5",
    measurementId: "G-NL8PHY5GCZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkSubmissions() {
    try {
        const q = query(collection(db, 'waitlist'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        
        console.log(`Total submissions: ${querySnapshot.size}`);
        console.log('\nSubmissions:');
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(`\nEmail: ${data.email}`);
            console.log('Metrics:', data.metrics);
            console.log('Timestamp:', data.timestamp?.toDate());
            console.log('-'.repeat(50));
        });
    } catch (error) {
        console.error('Error fetching submissions:', error);
    }
}

checkSubmissions();
