// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "void-estate.firebaseapp.com",
  projectId: "void-estate",
  storageBucket: "void-estate.appspot.com",
  messagingSenderId: "459974548587",
  appId: "1:459974548587:web:b788d7cfef5efa885ba52e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
