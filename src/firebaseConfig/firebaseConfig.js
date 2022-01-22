// Set the configuration for your app
// TODO: Replace with your project's config object
import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDtpQVi9J9LrVxRNg9w7WJfsck9GXP564A",
    authDomain: "uns2-bazinga-coderzzz.firebaseapp.com",
    projectId: "uns2-bazinga-coderzzz",
    storageBucket: "uns2-bazinga-coderzzz.appspot.com",
    messagingSenderId: "929581684610",
    appId: "1:929581684610:web:508b5aa8d4de429a5de19b",
    measurementId: "G-FFZ15H5F1T"
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);