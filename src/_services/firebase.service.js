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
    this.isAuth = false;
    this.db = firebase.firestore();
  }
  
  getFirebaseUi = () => firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.auth);

  createUserWithEmail = (email, password, firstName, lastName) =>
    this.auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      this.addNewUser(user.uid, firstName, lastName, email);
    })
    .then(() => this.onRedirect('/connect_to_spotify'))
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

    signInwithEmail = (email, password, history) => {
      this.isAuth = true;
      this.auth.signInWithEmailAndPassword(email, password)
      .then(() => this.onRedirect('/connect_to_spotify', history))
    }

    onRedirect = (pathname, history) => history.push({ pathname: pathname });

    onSignUpWithFacebook = (history) => {
      const self = this;
      const FacebookProvider = new firebase.auth.FacebookAuthProvider();
      this.auth.signInWithPopup(FacebookProvider).then(function(result) {
        const { given_name, family_name, email, picture } = result.additionalUserInfo.profile;
        const { uid, displayName, refreshToken, phoneNumber, photoURL } = result.user;
        const { accessToken, idToken, signInMethod, providerId, operationType } = result.credential;
        if (result.additionalUserInfo.isNewUser) {
          this.addNewUser(uid, given_name, family_name, email, phoneNumber, picture || photoURL);
        }
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        self.isAuth = true;
        self.onRedirect('/connect_to_spotify', history);
      }).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
    }

    onSignUpWithGoogle = (history) => {
      const self = this;
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      this.auth.signInWithPopup(googleProvider).then(function(result) {
        const { given_name, family_name, email, picture } = result.additionalUserInfo.profile;
        const { uid, displayName, refreshToken, phoneNumber, photoURL } = result.user;
        const { accessToken, idToken, signInMethod, providerId, operationType } = result.credential;
        if (result.additionalUserInfo.isNewUser) {
          this.addNewUser(uid, given_name, family_name, email, phoneNumber, picture || photoURL);
        }
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        self.isAuth = true;
        self.onRedirect('/connect_to_spotify', history);
      }).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
    }

    googleSignIn = (history) => {
      const self = this;
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      this.auth.signInWithPopup(googleProvider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        self.isAuth = true;
        self.onRedirect('/connect_to_spotify', history);
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
        // The email of the user's account used.
        console.log(error.email);
        // The firebase.auth.AuthCredential type that was used.
        console.log(error.credential);
        // ...
      });
    }

    facebookSignIn = (history) => {
      const self = this;
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        self.isAuth = true;
        self.onRedirect('/connect_to_spotify', history);
        // ...       
        }).catch(function(error) {
          // Handle Errors here.
          console.log(error.code);
          console.log(error.message);
          // The email of the user's account used.
          console.log(error.email);
          // The firebase.auth.AuthCredential type that was used.
          console.log(error.credential);
          // ...
        });
    }

    signOut = () => {
      this.auth.signOut();
      this.isAuth = false;
      console.log('&&& -- user sign out')
    }
}

export default Firebase;
// export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();