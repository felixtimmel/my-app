import React from 'react';
import './Landing.scss';
import Logo from '../_assets/splash_screen/Logo.svg';
import { Link } from "react-router-dom";

require('./Landing.scss');

const Landing = () => {
    return (
        <div className="landing-container">
            <div className="content">
                <div className="title">
                    <img src={Logo} alt='Oveo logo'/>
                </div>
                <div className="description">
                    <h2>Découvrez une toute nouvelle façon d'apprécier votre musique</h2>
                </div>
            </div>
            <div className="landing-btn">
                <div className="signup-btn">
                    <Link to='/signup'>S'INSCRIRE</Link>
                </div>
                <div className="login-btn">
                    <Link to='/login'>SE CONNECTER</Link>
                </div>
            </div>
        </div>
    );
}

export default Landing;