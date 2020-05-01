import React from 'react';
import ParamsView from './ParamsView';
import {withRouter} from 'react-router-dom';

require('./params.scss');
require('./toggle.scss');

class Params extends React.Component {
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

  getUserInfo = async() => {
    const { user: { uid }, firebaseClass, SpotifyClass } = this.props;
    let userName = '';
    let email = '';
    let spotifyUserName = '';
    let spotifyMembership = '';
    let addedSpotifyDate = '';
      try {
        const user = await firebaseClass.db.collection('users').doc(uid).get();
        const spotifyUser = await SpotifyClass.getUser();
        if (user.exists) {
          userName = `${user.data().firstName} ${user.data().lastName}`;
          email = user.data().email;
          spotifyUserName = spotifyUser.display_name
          spotifyMembership = spotifyUser.product
          addedSpotifyDate = user.data().addedSpotifyDate || 'to do';
        }
        this.setState({
          userName,
          email,
          spotifyUserName,
          spotifyMembership,
          addedSpotifyDate,
        });
      } catch(err) {
        console.log(`There was an error in getUserInfo call: ${err}`);
      }
  }
  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    const {
      isModalOpen,
      musicPush,
      musicMail,
      updatePush,
      updateMail,
      userName,
      email,
      spotifyUserName,
      spotifyMembership,
      addedSpotifyDate,
    } = this.state;
    return (
      <div className='params-container'>
        <ParamsView
          toggleModal={this.toggleModal}
          musicPush={musicPush}
          musicMail={musicMail}
          updatePush={updatePush}
          updateMail={updateMail}
          userName={userName}
          email={email}
          spotifyUserName={spotifyUserName}
          spotifyMembership={spotifyMembership}
          addedSpotifyDate={addedSpotifyDate}
          toggleNotifications={this.toggleNotifications}
          isModalOpen={isModalOpen}/>
      </div>
    )
  }
}

export default withRouter(Params);