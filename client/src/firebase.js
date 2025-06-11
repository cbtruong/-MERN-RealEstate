// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a288a.firebaseapp.com",
  projectId: "mern-estate-a288a",
  storageBucket: "mern-estate-a288a.firebasestorage.app",
  messagingSenderId: "656001298215",
  appId: "1:656001298215:web:319720e8c8e643ae388302",
  measurementId: "G-CF2LQHSSY3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);