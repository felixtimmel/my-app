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
    createUserWithEmail(mail, pass, firstName, lastName, this.props.history)
  }

  onShowPassword = (field) => {
    const { isPassVisible, isConfirmedPassVisible } = this.state;
    this.setState({
      isPassVisible: field.name === 'password' ? !isPassVisible : isPassVisible,
      isConfirmedPassVisible: field.name === 'confirmed_pass' ? !isConfirmedPassVisible : isConfirmedPassVisible,
    })
  }

  onSignUpWithGoogle = () => {
    const { onSignUpWithGoogle } = this.props.firebaseClass;
    onSignUpWithGoogle(this.props.history);
  }

  onSignUpWithFacebook = () => {
    const { onSignUpWithFacebook } = this.props.firebaseClass;
    onSignUpWithFacebook(this.props.history);
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