// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYIo0T4CBxa3ohpicw6hsq-RLdbpw5HPo",
  authDomain: "chulo-task-management-app.firebaseapp.com",
  projectId: "chulo-task-management-app",
  storageBucket: "chulo-task-management-app.appspot.com",
  messagingSenderId: "824526967889",
  appId: "1:824526967889:web:bfdb2204b7d21808b35470",
  measurementId: "G-NC2JNR5Z6Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);