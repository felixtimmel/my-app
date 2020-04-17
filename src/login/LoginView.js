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
			{console.log(props)}
			{ props.signInError &&
				<div className="signIn__error">
						<p><i class="fas fa-times"></i> L'adresse Email ou le mot de passe infiqué n'est pas valide...</p>
				</div>
			}
			<div className="signIn__form">
				<input placeholder="Email" type="text" className="signIn__form_input"/>
				<div className="input-container">
					<input 
						placeholder="Mot de passe" 
						type={props.isPassVisible ? 'text': 'password'} 
						className="signIn__form_input"
					/>
					<span className="password_logo" onClick={props.onShowPassword}>
						<img src={eyeLogo} alt='password logo' />
					</span>
				</div>
				<p>Mot de passe oublié ?</p>
				<div className="signIn__form_submit">
					<button type='submit' className="signIn__submit_btn"
						onClick={props.signInsubmit}
					>
						Se connecter
					</button>
				</div>
			</div>
			<div className="signIn__separator">
				<h5>Ou connectez-vous avec</h5>
			</div>
			<div className="signIn__social">
				<div className='signIn__social-btn'>
					<button onClick={props.facebookSignIn}>
							<img src={fblogo} alt="google logo"/>
					</button>
      		<p>Facebook</p>
   			</div>
				<div className='signIn__social-btn'>
					<button onClick={props.googleSignIn}>
							<img src={googlelogo} alt="google logo"/>
					</button>
					<p>Google</p>
				</div>
			</div>
		</div>
	);
}

export default LoginView;
    