// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-b81e0.firebaseapp.com",
  projectId: "mern-blog-b81e0",
  storageBucket: "mern-blog-b81e0.appspot.com",
  messagingSenderId: "483222094108",
  appId: "1:483222094108:web:69f5e8d05dd37e9504bad9",
  measurementId: "G-698KQTFBL9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


