import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


const WithAuth = (WrappedComponent, {firebaseClass}, state, SpotifyClass) => {
  return class ProtectedRoute extends Component {
    componentDidMount() {
      if (state.user) {
        fetch(`/send_uid?uid=${state.user.uid}`);
      }
    }

    render() {
      return state.user && !state.initialLoad ? <WrappedComponent
      {...this.props} {...state}
      firebaseClass={firebaseClass}
      SpotifyClass={SpotifyClass}
      /> : <Redirect to='/'/>;
    }
  }
}

export default WithAuth;