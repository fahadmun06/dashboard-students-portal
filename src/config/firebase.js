import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAjI_rELwkpC4fgCvSmt9QBPduZA-BWfro",
    authDomain: "hackathonsmit-06.firebaseapp.com",
    projectId: "hackathonsmit-06",
    storageBucket: "hackathonsmit-06.appspot.com",
    messagingSenderId: "352767698606",
    appId: "1:352767698606:web:59b3998c44e779332c2f3f",
    measurementId: "G-Q6XW0SES9J"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);         