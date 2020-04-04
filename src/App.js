import React from 'react';
import LoginView from './login/LoginView'
import LandingView from './landing/LandingView'
/* import logo from './logo.svg'; */
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/LoginView">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/LandingView">Landing</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/LoginView">
            <LoginView />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/LandingView">
            <LandingView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Signup() {
  return <h2>Sign up</h2>;
}

function Home() {
  return (
    <h2>Home</h2>
  );
}

export default App;
