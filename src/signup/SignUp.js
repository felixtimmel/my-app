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
    };
  }

  onSignUpWithEmail = (mail, pass, firstName, lastName) => {
    const { createUserWithEmail } = this.props.firebaseClass;
    createUserWithEmail(mail, pass, firstName, lastName);
    // then redirect
  }

  initGoogleSignUpUi = () => {
    const { firebase, currentUser, addNewUser } = this.props.firebaseClass;
    this.ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          const { given_name, family_name, email, picture } = authResult.additionalUserInfo.profile;
          const { uid, displayName, refreshToken, phoneNumber, photoURL } = authResult.user;
          const { accessToken, idToken, signInMethod, providerId, operationType } = authResult.credential;
          if (authResult.additionalUserInfo.isNewUser) {
            addNewUser(uid, given_name, family_name, email, phoneNumber, picture || photoURL);
          }
          return false;
        },
      },
      signInFlow: 'popup',
      // signInSuccessUrl: '<url-to-redirect-to-on-success>',
    });
  }

  componentDidMount() {
    // const { currentUser, getCurrentUser } = this.props.firebaseClass;
    this.initGoogleSignUpUi();
  }

  render() {
    // const {  } = this.props; 
    return (
      <>
        <SignUpView onSignUpWithEmail={this.onSignUpWithEmail}/>
      </>
    );
  }
}