import React, { Component } from 'react';
import { ConnectionView } from './ConnectionView';

require('./connection.scss');

export default class Connection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { SpotifyClass } = this.props;
    return (
      <div className='connection-container'>
        <ConnectionView SpotifyClass={SpotifyClass}/>
      </div>
    );
  }
}
