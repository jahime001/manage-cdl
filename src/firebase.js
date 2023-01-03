// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEemm_DuDRXMaW8HK_DI4LhC4u8Bpos58",
  authDomain: "managecdl-prod.firebaseapp.com",
  projectId: "managecdl-prod",
  storageBucket: "managecdl-prod.appspot.com",
  messagingSenderId: "40526136482",
  appId: "1:40526136482:web:340b1bd5940a88125ec3fb",
  measurementId: "G-ZY6N4W95Y7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app
export const auth = getAuth(app);
export const db = getFirestore()