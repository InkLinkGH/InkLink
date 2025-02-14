// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASqpQV1ZbAReT0uvdnD7FLlVYrq44h1Qc",
  authDomain: "inklink-37b44.firebaseapp.com",
  databaseURL: "https://inklink-37b44-default-rtdb.firebaseio.com",
  projectId: "inklink-37b44",
  storageBucket: "inklink-37b44.firebasestorage.app",
  messagingSenderId: "1045754527122",
  appId: "1:1045754527122:web:89eb567b86164f139a954b",
  measurementId: "G-VDK4YY132Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

console.log("Firebase initialized:", app);

// Sign Up Function
export async function signUp(email, password, username) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Store additional user info in the database
        await set(ref(db, `users/${user.uid}`), {
            username: username,
            email: email,
            createdAt: new Date().toISOString()
        });
        
        console.log("User signed up:", user.uid);
        return user;
    } catch (error) {
        console.error("Signup error:", error.message);
        throw error;
    }
}

// Login Function
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user.uid);
        return userCredential.user;
    } catch (error) {
        console.error("Login error:", error.message);
        throw error;
    }
}

// Logout Function
export async function logout() {
    try {
        await signOut(auth);
        console.log("User logged out");
    } catch (error) {
        console.error("Logout error:", error.message);
        throw error;
    }
}
