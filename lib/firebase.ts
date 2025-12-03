import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Configuration updated with provided credentials
const firebaseConfig = {
  apiKey: "AIzaSyBm_9Zxe1QZYW0YmoNTHezYmhDAFpzNbVg",
  authDomain: "hosting-1c99e.firebaseapp.com",
  projectId: "hosting-1c99e",
  storageBucket: "hosting-1c99e.firebasestorage.app",
  messagingSenderId: "773158617436",
  appId: "1:773158617436:web:db88dc5ffb594a24a54199"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();