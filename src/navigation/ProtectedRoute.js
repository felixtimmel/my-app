import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';


const WithAuth = (WrappedComponent, {firebaseClass}, state, SpotifyClass) => {
  return class ProtectedRoute extends Component {
    componentDidMount() {
      if (state.user) {
          firebaseClass.setUid(state.user.uid);
          fetch(`/send_uid?uid=${state.user.uid}`);
      }
    }

    render() {
      return state.user ? <WrappedComponent
      {...this.props} {...state}
      firebaseClass={firebaseClass}
      SpotifyClass={SpotifyClass}
      /> : <Redirect to='/'/>;
    }
  }
}

export default WithAuth;