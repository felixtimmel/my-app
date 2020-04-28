import React, { Component } from 'react';


const WithAuth = (WrappedComponent, {firebaseClass}, state, SpotifyClass) => {
  return class ProtectedRoute extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null,
        updatedToken: false,
      }
    }
    componentDidMount() {
      const self = this;
      firebaseClass.auth.onAuthStateChanged(function(user) {
        if (!user) {
          self.props.history.push('/')
        } else {
          if (!self.state.updatedToken) {
            firebaseClass.setUid(user.uid);
          }
          fetch(`/send_uid?uid=${user.uid}`);
          self.setState({
            user,
            updatedToken: true,
          })
        }
      })
    }

    render() {
        return this.state.user && !state.initialLoad ? <WrappedComponent
        {...this.props} {...this.state}
        firebaseClass={firebaseClass}
        SpotifyClass={SpotifyClass}
        /> : null;
    }
  }
}

export default WithAuth;