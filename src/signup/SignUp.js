/* eslint-disable no-unused-vars */
import React from 'react';
import { SignUpView } from './SignUpView';
import {withRouter} from 'react-router-dom';

require('./signup.scss');


class SignUp extends React.Component {
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
    createUserWithEmail(mail, pass, firstName, lastName)
    .then(() => this.onRedirect());
  }

  onShowPassword = (field) => {
    const { isPassVisible, isConfirmedPassVisible } = this.state;
    this.setState({
      isPassVisible: field.name === 'password' ? !isPassVisible : isPassVisible,
      isConfirmedPassVisible: field.name === 'confirmed_pass' ? !isConfirmedPassVisible : isConfirmedPassVisible,
    })
  }

  onRedirect = () => this.props.history.push({ pathname: '/connect_to_spotify' })

  onSignUpWithGoogle = () => {
    const { firebase, addNewUser } = this.props.firebaseClass;
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then(function(result) {
      const { given_name, family_name, email, picture } = result.additionalUserInfo.profile;
      const { uid, displayName, refreshToken, phoneNumber, photoURL } = result.user;
      const { accessToken, idToken, signInMethod, providerId, operationType } = result.credential;
      if (result.additionalUserInfo.isNewUser) {
        addNewUser(uid, given_name, family_name, email, phoneNumber, picture || photoURL);
        this.onRedirect();
      }
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
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
        this.onRedirect();
      }
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
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

export default withRouter(SignUp);