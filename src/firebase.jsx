import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDncJ-rPMYpaATDiOpP1zj_E2VmtXU9U30",
    authDomain: "todo-app-react-e24d1.firebaseapp.com",
    projectId: "todo-app-react-e24d1",
    storageBucket: "todo-app-react-e24d1.firebasestorage.app",
    messagingSenderId: "719169499619",
    appId: "1:719169499619:web:ce35ca79a1a377838230d6"
};

const initApp = initializeApp(firebaseConfig);
export const auth = getAuth(initApp);
export const db = getFirestore(initApp);

