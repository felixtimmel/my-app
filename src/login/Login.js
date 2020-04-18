import React from 'react'
import LoginView from './LoginView'
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.ui = this.props.firebaseClass.getFirebaseUi();

		this.state={
			registered: false,
			isPassVisible: false,
			email: '',
			password: '',
			signInError: false,
		}
	}

	onShowPassword = () => {
		const isPassVisible = this.state.isPassVisible;
		this.setState({
			isPassVisible: !isPassVisible
		})
	}

	googleSignIn = () => {
		const { firebase } = this.props.firebaseClass;
		const googleProvider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(googleProvider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			console.log(token)
			console.log(user)
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

	facebookSignIn = () => {
		const { firebase } = this.props.firebaseClass;
		const provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			console.log(token)
			console.log(user)
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

	signInsubmit = () => {
		const elements = document.querySelectorAll('.signIn__form_input');
		const email = elements[0].value
		const password = elements[1].value
		this.setState({
			email: email,
			password: password
		})
		/* console.log(firebase) */
		const firebase = this.props.firebaseClass
		firebase.auth.signInWithEmailAndPassword(email, password)
		.then(cred => {
			console.log(cred);
			this.setState({
				registered: true
			})
		})
		.catch((error) => {
			this.setState({
					signInError: error
				})
			})
	}

	render() {
		const { firebase } = this.props.firebaseClass;
		console.log(firebase.auth().currentUser)
		console.log(this.state.registered)
		if (this.state.registered) {
			return <Redirect to='/' />
		}
		return (
			<div className="login-container">
					<LoginView 
						isPassVisible={this.state.isPassVisible}
						onShowPassword = {this.onShowPassword}
						signInsubmit = {this.signInsubmit}
						googleSignIn = {this.googleSignIn}    
						facebookSignIn = {this.facebookSignIn}    
						signInError = {this.state.signInError}
					/>
					{/* {this.ui && <div id='firebaseui-auth-container'></div> } */}
			</div>
		)
	}
}

export default Login