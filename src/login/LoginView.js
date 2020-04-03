import React from 'react'
var firebase = require('firebase');
var firebaseui = require('firebaseui');
var ui = new firebaseui.auth.AuthUI(firebase.auth());

const LoginView = () => {
    return (
        <h2>Test</h2>
    );
}

export default LoginView;
    