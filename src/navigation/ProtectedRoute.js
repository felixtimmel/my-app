import React, { Component } from 'react';

const WithAuth = (WrappedComponent, {firebaseClass}, state, SpotifyClass) => {
  return class ProtectedRoute extends Component {
    constructor(props) {
      super(props);
      this.state = ({
        isLogin: false,
      });
    }
    componentDidMount() {
      const self = this;
      firebaseClass.auth.onAuthStateChanged(function(user) {
        if (!user) {
          self.props.history.push('/login');
        } else {
          console.log('USER CONNECTED');
          self.setState({
            isLogin: true,
          })
        }
      })
    }

    render() {
      const { isLogin } = this.state;
      return isLogin ? <WrappedComponent
      {...this.props} {...state}
      SpotifyClass={SpotifyClass}
      /> : <div>Loading...</div>;
    }
  }
}

export default WithAuth;