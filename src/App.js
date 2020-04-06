import React from 'react';
import Login from './login/Login'
import LandingView from './landing/LandingView';
import Signup from './signup/SignUp';

/* import logo from './logo.svg'; */
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App(props) {
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
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/login'>
            <Login firebaseClass={props.firebaseClass} />
          </Route>
          <Route path='/signup'>
            <Signup firebaseClass={props.firebaseClass} />
          </Route>
          <Route path='/landing'>
            <LandingView />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// function Signup() {
//   return <h2>Sign up</h2>;
// }

function Home() {
  return (
    <h2>Home</h2>
  );
}

export default App;
