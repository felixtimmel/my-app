import React, { Component } from 'react';
import { ConnectionView } from './ConnectionView';

require('./connection_success.scss');

export default class Connection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      membership: '',
      image: '',
    }
  }
  
  async componentDidMount() {
    const { SpotifyClass, firebaseClass } = this.props;
    const uid = firebaseClass.auth.currentUser.uid
    SpotifyClass.setToken();
    const access_token = SpotifyClass.access_token;
    const refresh_token = SpotifyClass.refresh_token;

    firebaseClass.registerToken(uid, access_token, refresh_token);
    const user = await SpotifyClass.getUser();
    this.setState({
      name: user.display_name,
      membership: user.product,
      image: user.images[0].url,
    });
  }

  render() {
    const { SpotifyClass } = this.props;
    const { name, membership, image } = this.state;
    return (
      <div className='success-connection-container'>
        <ConnectionView
          name={name}
          membership={membership}
          image={image}
          SpotifyClass={SpotifyClass}/>
      </div>
    )
  }
}
