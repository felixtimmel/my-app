import React from 'react';
import Logo from '../_assets/Inscription 1/Logo.svg'
import fblogo from '../_assets/Inscription_2/facebook-2.svg'
import googlelogo from '../_assets/Inscription_2/google-icon.svg'
import eyeLogo from '../_assets/Page_connexion/grey_eye.svg';

require('./Login.scss');
require('../signup/signup.scss');

export const LoginView = (props) => {
	return (
		<div className="signIn">
			<div>
				<img src={Logo} alt='Oveo logo' className="signIn__logo"/>
			</div>
			<h2>
				Bienvenue !<br/>
				Connecter vous à votre compte
			</h2>
			<div className="signIn__form">
				<input placeholder="Email" type="text"/>
				<div className="input-container">
					<input placeholder="Mot de passe" type="text"/>
					<span className="password_logo" /* onClick={() => props.onShowPassword(field)} */>
						<img src={eyeLogo} alt='password logo' />
					</span>
				</div>
				<p>Mot de passe oublié ?</p>
			</div>
			<button type='submit' className="signIn__submit_btn">Se connecter</button>
			<div className="signIn__separator">
				<h5>Ou connectez-vous avec</h5>
			</div>
			<div className="signIn__social">
				<div className='signIn__social-btn'>
					<button /* onClick={() => onSignUpWithFacebook()} */>
							<img src={fblogo} alt="google logo"/>
					</button>
      		<p>Facebook</p>
   			</div>
				<div className='signIn__social-btn'>
					<button /* onClick={() => onSignUpWithGoogle()} */>
							<img src={googlelogo} alt="google logo"/>
					</button>
					<p>Google</p>
				</div>
			</div>
		</div>
	);
}

export default LoginView;
    