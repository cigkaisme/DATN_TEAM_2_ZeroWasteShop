// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfAcLYRyi0cctZeoqVcJkPpV6y8hznyyQ",
  authDomain: "zerowasteshop-c3edd.firebaseapp.com",
  projectId: "zerowasteshop-c3edd",
  storageBucket: "zerowasteshop-c3edd.firebasestorage.app",
  messagingSenderId: "93843931206",
  appId: "1:93843931206:web:59352462f4ed7d3d254a47",
  measurementId: "G-FW7DK1PY1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
