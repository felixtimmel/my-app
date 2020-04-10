/* eslint-disable no-unused-vars */
import React from 'react';
import { SignUpView } from './SignUpView';
import { Formik } from 'formik';

require('./signup.scss');


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.ui = this.props.firebaseClass.getFirebaseUi();
    this.state = {
      email: '',
      passwaord: '',
      isPassVisible: false,
      isConfirmedPassVisible: false,
    };
  }

  onSignUpWithEmail = (mail, pass, firstName, lastName) => {
    const { createUserWithEmail } = this.props.firebaseClass;
    createUserWithEmail(mail, pass, firstName, lastName);
    // then redirect
  }

  onShowPassword = (field) => {
    console.log('field:', field)
    const { isPassVisible, isConfirmedPassVisible } = this.state;
    this.setState({
      isPassVisible: field.name === 'password' ? !isPassVisible : isPassVisible,
      isConfirmedPassVisible: field.name === 'confirmed_pass' ? !isConfirmedPassVisible : isConfirmedPassVisible,
    })
  }

  onSignUpWithGoogle = () => {
    const { firebase, addNewUser } = this.props.firebaseClass;
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then(function(result) {
      const { given_name, family_name, email, picture } = result.additionalUserInfo.profile;
      const { uid, displayName, refreshToken, phoneNumber, photoURL } = result.user;
      const { accessToken, idToken, signInMethod, providerId, operationType } = result.credential;
      if (result.additionalUserInfo.isNewUser) {
        addNewUser(uid, given_name, family_name, email, phoneNumber, picture || photoURL);
      }
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
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

  onSignUpWithFacebook = () => {
    const { firebase, addNewUser } = this.props.firebaseClass;
    const FacebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(FacebookProvider).then(function(result) {
      const { given_name, family_name, email, picture } = result.additionalUserInfo.profile;
      const { uid, displayName, refreshToken, phoneNumber, photoURL } = result.user;
      const { accessToken, idToken, signInMethod, providerId, operationType } = result.credential;
      if (result.additionalUserInfo.isNewUser) {
        addNewUser(uid, given_name, family_name, email, phoneNumber, picture || photoURL);
      }
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('user:', user)
      // ...
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

  // initGoogleSignUpUi = () => {
  //   const { firebase, currentUser, addNewUser } = this.props.firebaseClass;
  //   this.ui.start('#firebaseui-auth-container', {
  //     signInOptions: [
  //       {
  //         provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //         providerName: 'MyOIDCProvider',
  //         buttonColor: '#2F2F2F',
  //         iconUrl: '<icon-url-of-sign-in-button>',
  //         customParameters: {
  //           OIDCSupportedParameter: 'value'
  //         }
  //       },
  //       {
  //         iconUrl: fbLogo,
  //         buttonColor: '#2F2F2F',
  //         provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //         scopes :[
  //           'public_profile',
  //           'email',
  //           'user_likes',
  //           'user_friends'
  //         ],
  //       },
  //       // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //       // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //     ],
  //     callbacks: {
  //       signInSuccessWithAuthResult: function(authResult, redirectUrl) {
  //         const { given_name, family_name, email, picture } = authResult.additionalUserInfo.profile;
  //         const { uid, displayName, refreshToken, phoneNumber, photoURL } = authResult.user;
  //         const { accessToken, idToken, signInMethod, providerId, operationType } = authResult.credential;
  //         if (authResult.additionalUserInfo.isNewUser) {
  //           addNewUser(uid, given_name, family_name, email, phoneNumber, picture || photoURL);
  //         }
  //         return false;
  //       },
  //     },
  //     signInFlow: 'popup',
  //     // signInSuccessUrl: '<url-to-redirect-to-on-success>',
  //   });
  // }

  componentDidMount() {
    // const { currentUser, getCurrentUser } = this.props.firebaseClass;
  //   this.initGoogleSignUpUi();
  //   window.addEventListener("load", function(event) {
  //     const socialIcons =  document.getElementsByClassName('firebaseui-idp-icon');
  //     console.log('socialIcons:', socialIcons[0].src)
  //     console.log('google:', googleLogo)
  //     socialIcons[0].src = `${googleLogo}`;
  //     socialIcons[1].src = `${fbLogo}`;
  // });
  }

  render() {
    return (
      <div className='signup-container'>
        <SignUpView 
          onSignUpWithGoogle={this.onSignUpWithGoogle}
          onSignUpWithFacebook={this.onSignUpWithFacebook}
          onSignUpWithEmail={this.onSignUpWithEmail}
          onShowPassword={this.onShowPassword}
          isPassVisible={this.state.isPassVisible}
          isConfirmedPassVisible={this.state.isConfirmedPassVisible}/>
      </div>
    );
  }
}