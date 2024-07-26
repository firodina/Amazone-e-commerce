

import { getAuth } from 'firebase/auth'
import "firebase/compat/firestore"
import "firebase/compat/auth"
import firebase from 'firebase/compat/app';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJB2A31HqWwvuutNS1iiIfAFUC2bmg2qA",
  authDomain: "clone-59dc5.firebaseapp.com",
  projectId: "clone-59dc5",
  storageBucket: "clone-59dc5.appspot.com",
  messagingSenderId: "967849849764",
  appId: "1:967849849764:web:1ec26924b615cb531e4731"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db =  app.firestore()