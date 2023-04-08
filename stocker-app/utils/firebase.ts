// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMuIThFb8tf3AJgSHhK-BHajTpDEVs8gw",
  authDomain: "stocker-c11e2.firebaseapp.com",
  projectId: "stocker-c11e2",
  storageBucket: "stocker-c11e2.appspot.com",
  messagingSenderId: "161921211931",
  appId: "1:161921211931:web:446f84e8f1b3bae366a2be",
  measurementId: "G-RE8CREYNRM",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

export const db: firebase.firestore.Firestore = firebase.firestore(app);
