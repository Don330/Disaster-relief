// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALS0qLpsEoV6yy6afceIhjxAEnmkBLhP8",
  authDomain: "disaster-relief-b4a2e.firebaseapp.com",
  projectId: "disaster-relief-b4a2e",
  storageBucket: "disaster-relief-b4a2e.firebasestorage.app",
  messagingSenderId: "593287708958",
  appId: "1:593287708958:web:90be7d80dab2e380a2090f",
  measurementId: "G-8KQ17JH8B5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };