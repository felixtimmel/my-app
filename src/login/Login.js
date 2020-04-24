import React from 'react'
import LoginView from './LoginView'
import {withRouter} from 'react-router-dom';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			registered: false,
			isPassVisible: false,
			signInError: '',
			email: '',
			password: '',
		}
	}

	onShowPassword = () => {
		const isPassVisible = this.state.isPassVisible;
		this.setState({
			isPassVisible: !isPassVisible
		})
	}

	googleSignIn = () => {
		const { googleSignIn } = this.props.firebaseClass;
		googleSignIn(this.props.history)
	}

	facebookSignIn = () => {
		const { facebookSignIn } = this.props.firebaseClass;
		facebookSignIn(this.props.history);
	}

	handleInput = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	}

	signInsubmit = () => {
		const { email, password } = this.state;
		const { signInwithEmail } = this.props.firebaseClass;
		signInwithEmail(email, password, this.props.history)
		.catch((error) => {
			this.setState({
				signInError: error
			})
	})
	}

	render() {
		const { isPassVisible,signInError, email, password } = this.state;
		return (
			<div className="login-container">
					<LoginView 
						isPassVisible={isPassVisible}
						email={email}
						password={password}
						onShowPassword = {this.onShowPassword}
						signInsubmit = {this.signInsubmit}
						googleSignIn = {this.googleSignIn}
						facebookSignIn = {this.facebookSignIn}
						handleInput={this.handleInput}
						signInError = {signInError}
					/>
			</div>
		)
	}
}

export default withRouter(Login);