import React, { Suspense } from 'react';
import Backdrop from './backdrop/Backdrop';
import NavBar from './navigation/NavBar';
import SideDrawer from './sideDrawer/SideDrawer';
import ProtectedRoute from './navigation/ProtectedRoute';
import { TransitionGroup, CSSTransition, Transition } from "react-transition-group";


/* import logo from './logo.svg'; */
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Spotify from './_services/spotify.service';
const Login = React.lazy(() => import('./login/Login'));
const Home = React.lazy(() => import('./home/Home')); 
const Landing = React.lazy(() => import('./landing/Landing'));
const Signup = React.lazy(() => import('./signup/SignUp'));
const SpotifyConnection = React.lazy(() => import('./spotify_connection/connection/Connection'));
const  SuccessConnection  = React.lazy(() => import('./spotify_connection/connection_success/Connection'));
const Lyrics = React.lazy(() => import('./lyrics/Lyrics'));
const Params = React.lazy(() => import('./parameters/Params'));
const SpotifyClass = new Spotify();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
      user: null,
      sideDrawerOpen: false,
      initialLoad: true,
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

  componentDidMount() {
    this.setState({
      initialLoad: false,
    })
  }

  render() {
    let backdrop;

    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    const { firebaseClass } = this.props;
    const { initialLoad } = this.state;
    if (initialLoad && !this.state.user) {
      return <div>Loading....</div> // to replace by a component
    }
    return (
      <Router>
        <NavBar firebaseClass={firebaseClass} toggleTheme={this.toggleTheme} drawerClickHandler={this.drawerToggleClickHandler}/>
          <SideDrawer firebaseClass={firebaseClass} toggleTheme={this.toggleTheme} show={this.state.sideDrawerOpen} drawerClickHandler={this.drawerToggleClickHandler}/>
            {backdrop}
          <Suspense fallback={<div>Loading.....</div>}>
            <Switch>
              <Route path='/home' component={ProtectedRoute(Home, {...this.props}, {...this.state}, SpotifyClass)}/>
              <Route path='/song' component={ProtectedRoute(Lyrics, {...this.props}, {...this.state})}/>
              <Route path='/params' component={ProtectedRoute(Params, {...this.props}, {...this.state})}/>
              <Route path='/loged_in_spotify' component={ProtectedRoute(SuccessConnection, {...this.props}, {...this.state}, SpotifyClass)}/>
              <Route path='/connect_to_spotify' component={ProtectedRoute(SpotifyConnection, {...this.props}, {...this.state}, SpotifyClass, firebaseClass)}/>
              <Route path='/login'>
                <Login firebaseClass={firebaseClass} {...this.state}/>
              </Route>
              <Route path='/signup'>
                <Signup firebaseClass={firebaseClass} {...this.state}/>
              </Route>
              <Route path='/'>
                <Landing />
              </Route>
            </Switch>
          </Suspense>
      </Router>
    );
  }
}

