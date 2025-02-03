// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd-JEfsPz0kAH8mzaklr6-34-sJbhZl80",
  authDomain: "fir-test-4681d.firebaseapp.com",
  projectId: "fir-test-4681d",
  storageBucket: "fir-test-4681d.firebasestorage.app",
  messagingSenderId: "351130927479",
  appId: "1:351130927479:web:9ee7afdc853a7f6d886172"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export default db;