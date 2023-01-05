import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA97LT3VhVzUiomQe6-7kmVB-JxyRgX8Lc",
  authDomain: "react-native-produc.firebaseapp.com",
  projectId: "react-native-produc",
  storageBucket: "react-native-produc.appspot.com",
  messagingSenderId: "944667587943",
  appId: "1:944667587943:web:5de12d1cd420b7e14aebc2",
};

const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
