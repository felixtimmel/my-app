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
    const { SpotifyClass } = this.props;
    SpotifyClass.setToken();
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
