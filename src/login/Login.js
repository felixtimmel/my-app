import React from 'react'
import LoginView from './LoginView'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.ui = this.props.firebaseClass.getFirebaseUi();

        this.state={
            isPassVisible: false,
        }
    }

    onShowPassword = (field) => {
        const { isPassVisible } = this.state;
        this.setState({
          isPassVisible: field.name === 'password' ? !isPassVisible : isPassVisible,
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
            <LoginView isPassVisible={this.state.isPassVisible}/>
            {/* {this.ui && <div id='firebaseui-auth-container'></div> } */}
        </div>
        )
    }
}

export default Login