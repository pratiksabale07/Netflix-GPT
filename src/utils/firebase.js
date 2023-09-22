// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCduhD7DXQkmZ7P-A-R8RI8BV15SypKIXA",
  authDomain: "netflixgpt-fb6ed.firebaseapp.com",
  projectId: "netflixgpt-fb6ed",
  storageBucket: "netflixgpt-fb6ed.appspot.com",
  messagingSenderId: "304876660192",
  appId: "1:304876660192:web:289ad94f9323208d19f785",
  measurementId: "G-X4ERDNR4VS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();