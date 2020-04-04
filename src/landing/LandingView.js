import React from 'react'
import './Landing.scss';
import Button from '../buttons/ButtonView'

const Landing = () => {
    return (
        <div>
            <div className="content">
                <div className="title">
                    <h1>OVEO</h1>
                </div>
                <div className="description">
                    <h2>Découvrez une toute nouvelle façon d'apprécier votre musique</h2>
                </div>
            </div>
            <div className="landing-btn">
                <div>
                    <Button content="s'inscire" link='/login'/>
                </div>
                <div>
                    <Button content="se connecter" link='/signup'/>
                </div>
            </div>
        </div>
    );
}

export default Landing;