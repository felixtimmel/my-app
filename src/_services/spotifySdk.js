const spotifySDK = (usertoken) => {
  const scriptPromise = new Promise((resolve, reject) => {
    const spotifySDK = document.createElement('script');
    spotifySDK.setAttribute('src','https://sdk.scdn.co/spotify-player.js');
    document.body.appendChild(spotifySDK);
    if (window.Spotify) {
      resolve(window.Spotify);
    } else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve(window.Spotify);
      };
    }
    spotifySDK.onerror = (err) => {
      console.log('reject onerror:', err)
      reject();
    }
  })

  return scriptPromise
  .then((spotify) => {
    console.log('SCRIPT LOADED');
      window.spotifyPlayer = new spotify.Player({
        name: 'Spotify web player',
        getOAuthToken: cb => {cb(usertoken); }
      });
      console.log('@@@@@@@@@@@@spotifyPlayer:', window.spotifyPlayer)
      // Error handling
      console.log(' window.spotifyPlayer:',  window.spotifyPlayer)
      window.spotifyPlayer.addListener('initialization_error', ({ message }) => { console.error('1', message); });
      window.spotifyPlayer.addListener('authentication_error', ({ message }) => { console.error('2', message); });
      window.spotifyPlayer.addListener('account_error', ({ message }) => { console.error('3', message); });
      window.spotifyPlayer.addListener('playback_error', ({ message }) => { console.error('4', message); });
    
      // Playback status updates
      window.spotifyPlayer.addListener('player_state_changed', (state) => {
        console.log('state:', state)
        window.spotifyMusicPosition = state.position;
        /**
         * duration , position, paused
         */
      });
    
      // Ready
      window.spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        // play the song you need once the device is initialized
      });
    
      // Not Ready
      window.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
    
      // Connect to the player!
      window.spotifyPlayer.connect()
      .then(res => {
        console.log('ressssssss', res);
      })
      .catch(err => console.log(err));
  }).catch(() => {
    console.log('ERRRRRR');
  })
}

export default spotifySDK;