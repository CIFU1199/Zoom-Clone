// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {collection, getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7SyrYa52Vcb149NJMdv_LDMpkEURUnss",
  authDomain: "zoom-clone-8dae0.firebaseapp.com",
  projectId: "zoom-clone-8dae0",
  storageBucket: "zoom-clone-8dae0.appspot.com",
  messagingSenderId: "505366235588",
  appId: "1:505366235588:web:7f837b2e3604068a6b7c91",
  measurementId: "G-FS6GKQKXY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB,"users");
