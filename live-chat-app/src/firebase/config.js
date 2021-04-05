import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA-_lqbAnAykZBmbSS9q-DfXQf4TfVRgck",
  authDomain: "udemy-vue-projects-1c4f9.firebaseapp.com",
  projectId: "udemy-vue-projects-1c4f9",
  storageBucket: "udemy-vue-projects-1c4f9.appspot.com",
  messagingSenderId: "476710499907",
  appId: "1:476710499907:web:43fc91eff3559a1eaf06f6",
  measurementId: "G-MVSFZPQ1MT",
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, timestamp }