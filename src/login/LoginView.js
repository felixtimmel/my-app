import React from 'react'

 const LoginView = (props) => {
     const ui = props.firebase.getFirebaseUi();
     console.log('ui:', ui)
         ui.start('#firebaseui-auth-container', {
             signInOptions: [
                 props.firebase.firebase.auth.EmailAuthProvider.PROVIDER_ID
             ],
             // Other config options...
         });
     return (
         <>
             <h2>Test</h2>
             {ui && <div id='firebaseui-auth-container'></div> }
         </>
     );
 }

export default LoginView;
    