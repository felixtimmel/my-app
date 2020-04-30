import React from 'react';
import logo from '../_assets/splash_screen/logo_oveo.png';
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<div className="landing-container">
			<div className="title">
				<img src={logo} alt='Oveo logo'/>
			</div>

			<div className="description">
				<h2>Découvrez une toute nouvelle façon d'apprécier votre musique</h2>
			</div>

			<div className="landing-btn">
				<Link to='/signup'>
					<div className="signup-btn">S'INSCRIRE</div>
				</Link>
				<Link to='/login'>
					<div className="login-btn">SE CONNECTER</div>
				</Link>
			</div>
		</div>
	);
}

export default Landing;