import firebase from "firebase";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALfhDy1Y8ALyeRv0zN8XdleQN5WaMBLM0",
  authDomain: "ecommerce-demo-6187e.firebaseapp.com",
  databaseURL: "https://ecommerce-demo-6187e.firebaseio.com",
  projectId: "ecommerce-demo-6187e",
  storageBucket: "ecommerce-demo-6187e.appspot.com",
  messagingSenderId: "437103100211",
  appId: "1:437103100211:web:cfccf53c220dbb75dfbe46",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
