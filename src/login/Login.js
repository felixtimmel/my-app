import React from 'react'
import LoginView from './LoginView'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.ui = this.props.firebaseClass.getFirebaseUi();

        this.state={
            isPassVisible: false,
            email: '',
            password: '',
        }
    }

    onShowPassword = (field) => {
        const { isPassVisible } = this.state;
        this.setState({
          isPassVisible: field.name === 'password' ? !isPassVisible : isPassVisible,
        })
      }

    signInsubmit = () => {
        const elements = document.querySelectorAll('.signIn__form_input');
        const email = elements[0].value
        const password = elements[1].value
        const firebase = this.props.firebaseClass
        this.setState({
            email: email,
            password: password
        })
        /* console.log(firebase) */
        firebase.auth.signInWithEmailAndPassword(email, password)
            .then(cred => {console.log(cred)})
            .catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            })
    }

    componentDidMount() {
      /* const { firebase } = this.props.firebaseClass;
        this.ui.start('#firebaseui-auth-container', {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            // Other config options...
        }); */
    }
    render() {
        return (
        <div className="login-container">
            <LoginView 
                isPassVisible={this.state.isPassVisible}
                signInsubmit = {this.signInsubmit}    
            />
            {/* {this.ui && <div id='firebaseui-auth-container'></div> } */}
        </div>
        )
    }
}

export default Login