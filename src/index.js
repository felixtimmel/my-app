import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './themes.scss';
import App from './App';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Firebase  from './_services/firebase.service';
const firebaseClass = new Firebase();
ReactDOM.render(
  <App firebaseClass={firebaseClass}/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
