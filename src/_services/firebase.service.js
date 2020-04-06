import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// import 'firebase/database';
import * as firebaseui from 'firebaseui';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

let config;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID,
};

// const devConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_DEV_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DEV_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DEV_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_DEV_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_DEV_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_DEV_MESSAGING_ID,
//   appId: process.env.REACT_APP_FIREBASE_DEV_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_DEV_MEASURMENT_ID,
// }

// If we need a dev & staging environment later 
// config = process.env.prod === 'production' ? firebaseConfig : devConfig;
config = firebaseConfig;

class Firebase {
  constructor() {
    !firebase.apps.length ? firebase.initializeApp(config): firebase.app();
    // firebase.analytics();
    this.firebase = firebase;
    this.auth = firebase.auth();
    this.currentUser = firebase.auth().currentUser;
    this.db = firebase.firestore();
  }
  
  getFirebaseUi = () => firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.auth);

  createUserWithEmail = (email, password, firstName, lastName) =>
    this.auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      this.addNewUser(user.uid, firstName, lastName, email);
    })
    .catch(err => {
      console.log('createUserWithEmailAndPassword error', err.code);
      console.log('createUserWithEmailAndPassword error', err.message);
    });

    addNewUser = (uid, firstName, lastName, email, phoneNumber='', picture='') => {
      this.db.collection('users').add({
        firstName,
        lastName,
        email,
        uid,
        picture,
        phoneNumber,
      })
      .then(docRef => console.log(`Document was created with the uid: ${docRef.id}`))
      .catch(err => {console.log(`There was an error: ${err}`)})
    }
  
    getCurrentUser = () => {
      this.auth.onAuthStateChanged(user => user ? console.log('user is signed', user) : console.log('NO USER'))
    }

    signOut = () => this.auth.signOut();
}

export default Firebase;
// export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();