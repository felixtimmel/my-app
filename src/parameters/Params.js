import React, { Component } from 'react';
import ParamsView from './ParamsView';

require('./params.scss');
require('./toggle.scss');

export default class Params extends Component {
  constructor() {
    super();
    this.state={
      isModalOpen: false,
      musicPush: false,
      musicMail: false,
      updatePush: false,
      updateMail: false,
      userName: '',
      email: '',
      spotifyUserName: '',
      spotifyMembership: '',
      addedSpotifyDate: '',
    }
  }

  toggleModal = () =>{
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen,
    })
  }

  toggleNotifications = (e) => {
    const { name, checked } = e.target;
    this.setState({
      [name]: checked,
    });
  }
  render() {
    const {
      isModalOpen,
      musicPush,
      musicMail,
      updatePush,
      updateMail
    } = this.state;
    return (
      <div className='params-container'>
        <ParamsView
          toggleModal={this.toggleModal}
          musicPush={musicPush}
          musicMail={musicMail}
          updatePush={updatePush}
          updateMail={updateMail}
          toggleNotifications={this.toggleNotifications}
          isModalOpen={isModalOpen}/>
      </div>
    )
  }
}
