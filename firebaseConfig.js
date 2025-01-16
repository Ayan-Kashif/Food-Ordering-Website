// firebaseConfig.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/analytics"; // If you're using Firebase analytics

const firebaseConfig = {
    apiKey: "AIzaSyAm5sRfXacZ-C2DfZ_kTwh5h2vRMiXDS2Q",
    authDomain: "lahori-4c07c.firebaseapp.com",
    projectId: "lahori-4c07c",
    storageBucket: "lahori-4c07c.firebasestorage.app",
    messagingSenderId: "322682568452",
    appId: "1:322682568452:web:a61045d9620476ed709a51",
    measurementId: "G-GQ4RBS2ZF7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the default app
}

export default firebase;
