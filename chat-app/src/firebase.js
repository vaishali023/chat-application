import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCl5ZnlTee5180LNwQ0RcY_rFng04ABLs0",
    authDomain: "chat-91ecd.firebaseapp.com",
    projectId: "chat-91ecd",
    storageBucket: "chat-91ecd.appspot.com",
    messagingSenderId: "696448618594",
    appId: "1:696448618594:web:380ab68fa77e4a3900813b"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };