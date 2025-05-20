import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // Config Code
};

const initApp = initializeApp(firebaseConfig);
export const auth = getAuth(initApp);
export const db = getFirestore(initApp);

