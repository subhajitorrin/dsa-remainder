// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxsaBCCAZAPUoAjzld1JZu_ZN-MIV9DTM",
    authDomain: "dsa-remainder.firebaseapp.com",
    projectId: "dsa-remainder",
    storageBucket: "dsa-remainder.appspot.com",
    messagingSenderId: "839601567470",
    appId: "1:839601567470:web:074a2ac08908d2da2365ff"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { app, auth,db,provider }