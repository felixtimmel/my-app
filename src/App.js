import React from 'react';
import Login from './login/Login'
import Home from './home/Home'
import LandingView from './landing/LandingView';
import Signup from './signup/SignUp';
import SpotifyConnection from './spotify_connection/connection/Connection';
import SuccessConnection from './spotify_connection/connection_success/Connection';
import Params from './parameters/Params';


/* import logo from './logo.svg'; */
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Spotify from './_services/spotify.service';
const SpotifyClass = new Spotify();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
    }
  }

  toggleTheme = () => {
    const { theme } = this.state;
    document.documentElement.classList.add("color-theme-in-transition");
    const newTheme = theme === 'dark' ? 'light' : 'dark'  ;
    this.setState({
      theme: newTheme,
    });
    document.documentElement.setAttribute("data-theme", newTheme);
    window.setTimeout(() => {
      document.documentElement.classList.remove("color-theme-in-transition");
    }, 1000);
  }

  render() {
    const { firebaseClass } = this.props;
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/signup'>Sign up</Link>
              </li>
              <li>
                <Link to='/landing'>Landing</Link>
              </li>
              <li>
                <Link to='/params'>Parameters</Link>
              </li>
              <li>
                <button onClick={() => this.toggleTheme()}>Change Theme</button>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
          <Route path='/params'>
              <Params SpotifyClass={SpotifyClass}/>
          </Route>
          <Route path='/loged_in_spotify'>
              <SuccessConnection SpotifyClass={SpotifyClass}/>
            </Route>
            <Route path='/connect_to_spotify'>
              <SpotifyConnection SpotifyClass={SpotifyClass}/>
            </Route>
            <Route path='/login'>
              <Login firebaseClass={firebaseClass} />
            </Route>
            <Route path='/signup'>
              <Signup firebaseClass={firebaseClass} />
            </Route>
            <Route path='/landing'>
              <LandingView />
            </Route>
            <Route path='/'>
              <Home spotifyClass={SpotifyClass}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

