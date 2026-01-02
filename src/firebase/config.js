import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCkd5TwlSyO7AWx-Zp1YWN0bmbEhZ8odDU",
    authDomain: "ecom-web-app-69206.firebaseapp.com",
    projectId: "ecom-web-app-69206",
    storageBucket: "ecom-web-app-69206.firebasestorage.app",
    messagingSenderId: "661830374738",
    appId: "1:661830374738:web:011ea0dec34ea83974168b",
    measurementId: "G-3D41YZ313N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { auth, db, analytics };
