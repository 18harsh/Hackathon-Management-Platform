// Set the configuration for your app
// TODO: Replace with your project's config object
import firebase from 'firebase/compat/app';

// export default !firebase.apps.length ? firebase.initializeApp(DR_CONFIG) : firebase.app();
firebase.initializeApp({
    apiKey: "AIzaSyDtpQVi9J9LrVxRNg9w7WJfsck9GXP564A",
    authDomain: "uns2-bazinga-coderzzz.firebaseapp.com",
    projectId: "uns2-bazinga-coderzzz",
    storageBucket: "uns2-bazinga-coderzzz.appspot.com",
    messagingSenderId: "929581684610",
    appId: "1:929581684610:web:508b5aa8d4de429a5de19b",
    measurementId: "G-FFZ15H5F1T"
});

export default firebase;
