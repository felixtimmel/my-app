import React from 'react';
import musicLogo from '../../_assets/Page_connexion/undraw_compose_music_ovo2.svg';
import oveoXspotify from '../../_assets/Page_connexion/oveo_X_spotify.svg';
import spotifyLogo from '../../_assets/Insciption_2/spotify-2.svg';
import { withRouter } from 'react-router-dom';

export const ConnectionView = withRouter(({SpotifyClass, history}) => {
  return (
      <div className="connection">
        <div className="connection__logo">
          <img src={oveoXspotify} alt="oveo x spotify logo"/>
        </div>
        <div className="connection__description">
          <h4>
            Oveo fonctionne mieux avec Spotify Premium !
          </h4>
          <p>
            Si vous avez un compte spotify premium <br/>
            Connectez-vous dès maintenant, et <br/>
            profiter des avantages de votre compte
          </p>
        </div>
        <div className="connection__music-logo">
          <img src={musicLogo} alt=""/>
        </div>
        <div className="connection__btns">
          <button
            className="connection__btns-spotify"
            onClick={() => SpotifyClass.onLoginToSpotify()}>
            <img src={spotifyLogo} alt="Spotify logo"/>
            Se connecter
          </button>
          <button onClick={() => history.push('/')} className="connection__btns-not-now">
              Pas maintenant
          </button>
        </div>
      </div>
  );
})