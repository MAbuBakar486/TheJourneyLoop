// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANQ9uLholyEj1vdErk8rfzMcWJc2Aemd8",
  authDomain: "thejourneyloop-d7e01.firebaseapp.com",
  projectId: "thejourneyloop-d7e01",
  storageBucket: "thejourneyloop-d7e01.firebasestorage.app",
  messagingSenderId: "774864837813",
  appId: "1:774864837813:web:a15eca86895621629572fc",
  measurementId: "G-ZKMYD0LFWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);


