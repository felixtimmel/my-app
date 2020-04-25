import React from 'react';
import ProtectedRoute from './navigation/ProtectedRoute';
import Login from './login/Login'
import Home from './home/Home'
import Landing from './landing/Landing';
import Signup from './signup/SignUp';
import SpotifyConnection from './spotify_connection/connection/Connection';
import SuccessConnection from './spotify_connection/connection_success/Connection';
import Params from './parameters/Params';
import Lyrics from './lyrics/Lyrics';
import Backdrop from './backdrop/Backdrop'
import NavBar from './navigation/NavBar'
import SideDrawer from './sideDrawer/SideDrawer';


/* import logo from './logo.svg'; */
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Spotify from './_services/spotify.service';
const SpotifyClass = new Spotify();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
      user: {},
      sideDrawerOpen: false,
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

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({
      sideDrawerOpen: false,
    });
  };

  render() {
    let backdrop;

    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    const { firebaseClass } = this.props;
    return (
      <Router>
        <NavBar firebaseClass={firebaseClass} toggleTheme={this.toggleTheme} drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer firebaseClass={firebaseClass} toggleTheme={this.toggleTheme} show={this.state.sideDrawerOpen} drawerClickHandler={this.drawerToggleClickHandler}/>
        {backdrop}
          <Switch>
            <Route path='/song' component={ProtectedRoute(Lyrics, {...this.props}, {...this.state})}/>
            <Route path='/params' component={ProtectedRoute(Params, {...this.props}, {...this.state})}/>
            <Route path='/loged_in_spotify' component={ProtectedRoute(SuccessConnection, {...this.props}, {...this.state}, SpotifyClass)}/>
            <Route path='/connect_to_spotify' component={ProtectedRoute(SpotifyConnection, {...this.props}, {...this.state}, SpotifyClass, firebaseClass)}/>
            <Route path='/home' component={ProtectedRoute(Home, {...this.props}, {...this.state}, SpotifyClass)}/>
            <Route path='/login'>
              <Login firebaseClass={firebaseClass} />
            </Route>
            <Route path='/signup'>
            <Signup firebaseClass={firebaseClass} />
            </Route>
            <Route path='/'>
              <Landing />
            </Route>
          </Switch>
      </Router>
    );
  }
}

