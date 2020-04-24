import React from 'react';
import logo from '../../_assets/Inscription_2/spotify-2.svg';
import spotifyLogo from '../../_assets/Inscription_2/spotify-1.svg';
import ipadImg from '../../_assets/I-3 _Inscription_3/undraw_meditating_0nae.svg';
import { withRouter } from 'react-router-dom';

export const ConnectionView = withRouter(({SpotifyClass, name, membership, image, history}) => {
  return (
    <div className='connection'>
      <h4>Connection réussie.</h4>
      <div className="connection__card">
        <div className="connection__card-left">
          <span className="connection__card-left_img">
            <img id='member' src={image} alt="member"/>
            <img id='spotify' src={logo} alt="spotify logo"/>
          </span>
          <div className="connection__card-left_name">
            <span>{name}</span>
            <span id='membership'>Membre {membership}</span>
          </div>
        </div>
        <div className="connection__card-right">
          <img src={spotifyLogo} alt="spotify logo"/>
        </div>
      </div>
      <div className="connection__middle">
        <img src={ipadImg} alt="ipad svg"/>
        <span>
          Super ! Vous pouvez dès à présent commencer à utiliser oveo
        </span>
      </div>
      <div className="connection__button">
        <button onClick={() => history.push('/home')}>C'est partie !</button>
      </div>
    </div>
  );
})
