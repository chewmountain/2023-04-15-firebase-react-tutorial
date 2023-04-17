// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRcFrKpddJZK5LdCrAvIwQOeAfCrk783Q",
  authDomain: "fir-tutorial-181bf.firebaseapp.com",
  projectId: "fir-tutorial-181bf",
  storageBucket: "fir-tutorial-181bf.appspot.com",
  messagingSenderId: "733329431707",
  appId: "1:733329431707:web:a376aeac48fae4d7307a3e",
  measurementId: "G-DS2LDRH4ZP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvide = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);
