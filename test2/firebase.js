import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGL7mz03FVyULK6aZR7-iOBjojPgy7zCE",
  authDomain: "react-native-test-14f51.firebaseapp.com",
  projectId: "react-native-test-14f51",
  storageBucket: "react-native-test-14f51.appspot.com",
  messagingSenderId: "610199308894",
  appId: "1:610199308894:web:6b92d4e2875650246f42cf",
};

export const app = initializeApp(firebaseConfig);

const db = getFirestore();
export { db };
