import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
// Firebase configuration
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);
console.log("Firebase initialized:", app);
// Function to Sign Up
export async function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log("User signed up:", userCredential.user.uid);
      })
      .catch(error => {
        console.error("Signup error:", error.message);
      });
    }

// Function to Log In
export async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user.uid);
      
      // Check if user is valid before redirecting
      if (user) {
        window.location.href = "/test.html";  // Redirect after successful login
      } else {
        console.error("Login failed: User is undefined");
        alert("Login failed: User is undefined");
      }
    } catch (error) {
        console.error("Login error:", error.message);

        // Custom error handling
        if (error.code === 'auth/wrong-password') {
          alert("Login failed: Incorrect password");
        } else if (error.code === 'auth/user-not-found') {
          alert("Login failed: User not found");
        } else {
          alert("Login failed: " + error.message);
        }
    }
  }

// Function to Log Out
export async function logout() {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        window.location.href = "/index.html";
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  }

// Function to Check if User is Logged In
checkAuth((user) => {
    if (user) {
      window.location.href = "/test.html";  // Redirect if already authenticated
    }
  });