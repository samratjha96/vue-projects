import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-_lqbAnAykZBmbSS9q-DfXQf4TfVRgck",
  authDomain: "udemy-vue-projects-1c4f9.firebaseapp.com",
  projectId: "udemy-vue-projects-1c4f9",
  storageBucket: "udemy-vue-projects-1c4f9.appspot.com",
  messagingSenderId: "476710499907",
  appId: "1:476710499907:web:4cc465bead4f2923af06f6",
  measurementId: "G-T74EXTJSB5"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
