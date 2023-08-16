// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXUw7Vps_bDlXjuDLJOJh3doFVsAtBN_o",
    authDomain: "realtor-hotels-react.firebaseapp.com",
    projectId: "realtor-hotels-react",
    storageBucket: "realtor-hotels-react.appspot.com",
    messagingSenderId: "683486330359",
    appId: "1:683486330359:web:089d43bf1df92f35be82f2",
    measurementId: "G-E5YQDY4S5L"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
export const analytic  = analytics;