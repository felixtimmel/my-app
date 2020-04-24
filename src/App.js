import React from 'react';
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

  authListener() {
    const { firebase } = this.props.firebaseClass
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
        this.setState({ user })
			} else {
				this.setState({ user: null })
			}
		});
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

  componentDidMount() {
    this.authListener();
  }

  render() {
    let backdrop;

    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    const { firebaseClass } = this.props;
    console.log(firebaseClass)
    return (
      <Router className='test'>
        <NavBar firebaseClass={firebaseClass} toggleTheme={this.toggleTheme} drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer firebaseClass={firebaseClass} toggleTheme={this.toggleTheme} show={this.state.sideDrawerOpen}/>
        {backdrop}
          <Switch>
            <Route path='/song'>
              <Lyrics/>
            </Route>
            <Route path='/params'>
              {this.state.user
              ? <Params SpotifyClass={SpotifyClass} />
              : <Login firebaseClass={firebaseClass} />}
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
            <Route path='/home'>
              <Home spotifyClass={SpotifyClass} firebaseClass={firebaseClass} user={this.state.user}/>
            </Route>
            <Route path='/'>
              {this.state.user 
              ? <Landing />
              : <Login firebaseClass={firebaseClass} />
            }
            </Route>
          </Switch>
      </Router>
    );
  }
}

