import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase  from './_services/firebase.service';
import SpotifyLogin from 'react-spotify-login';
import { clientId, redirectUri } from './home/Home';

const firebase = new Firebase();
const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

ReactDOM.render(
  <React.StrictMode>
    <App firebase={firebase}/>
    <SpotifyLogin clientId={clientId}
    redirectUri={redirectUri}
    onSuccess={onSuccess}
    onFailure={onFailure}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
