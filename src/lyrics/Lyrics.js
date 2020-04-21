import React, { Component } from 'react';
import LyricsView from './LyricsView';

require('./lyrics.scss');
export default class Lyrics extends Component {
  constructor(props) {
    super(props);
    this.getLyrics = this.getLyrics.bind(this);
    this.player = null;
    this.currState = {};

    this.state = {
      lyrics: [],
      inputValue: 0,
      musicLength: 0,
      isPlayerReady: false,
      bubbleValue: 0,
      musicPosition: 0,
    }
  }

  getMilliToMinutes = (milliSeconds) => {
    const minutes = Math.floor(milliSeconds / 60000);
    const seconds = ((milliSeconds % 60000) / 1000).toFixed(0);
    return `${minutes} : ${seconds < 10 ? 0 : ''} ${seconds}`;
  }

  getPosition = () => {
    if (this.currState.paused) {
      return this.currState.position;
    }
    let position = this.currState.position + (performance.now() - this.currState.updateTime) / 1000;
    console.log('position:', position)
    return position > this.currState.duration ? this.currState.duration : position;
  }

  onScriptLoad = () => {
    const scriptPromise = new Promise((resolve, reject) => {
      const spotifySDK = document.createElement('script');
      spotifySDK.setAttribute('src','https://sdk.scdn.co/spotify-player.js');
      document.body.appendChild(spotifySDK);
      spotifySDK.onload = () => {
        resolve()
      }
      spotifySDK.onerror = () => {
        reject();
      }
    })

    return scriptPromise
    .then(() => {
      console.log('SCRIPT LOADED');
      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'BQA6bJ_BmUHYyFWRPEQI3Wi8mE_JGboNT8Dd3IxGSaALmBdzoAwKHtQzWFSbp_AxAvFCXXeimUcknxxuv3YxT7oIRXFn70y_oW5CxB3eQT6oljhubxOFx9VGLMWN-Mz4goXw8IKD_ZMHqzFzX6yR1BcawSJIuxDr7WPqX9jAuN7p904Po5D8';
        this.player = new window.Spotify.Player({
          name: 'Spotify web player',
          getOAuthToken: cb => {cb(token); }
        });
        // Error handling
        this.player.addListener('initialization_error', ({ message }) => { console.error('1', message); });
        this.player.addListener('authentication_error', ({ message }) => { console.error('2', message); });
        this.player.addListener('account_error', ({ message }) => { console.error('3', message); });
        this.player.addListener('playback_error', ({ message }) => { console.error('4', message); });
      
        // Playback status updates
        this.player.addListener('player_state_changed', (state) => {
          console.log('state:', state)
          /**
           * duration , position, paused
           */
          this.currState.paused = state.paused;
          this.currState.position = state.position;
          this.currState.duration = state.duration;
          this.currState.updateTime = performance.now()
          if (state.paused) {
            this.setState({
              musicPosition:state.position,
            })
          }
          // setInterval(() => {
            // const bubble = document.querySelector('.bubble');
            // const positionSeconds = this.getPosition();
            // const minutes = Math.floor(positionSeconds / 60000);
            // console.log('minutes:', minutes)
            // bubble.innerHTML = positionSeconds;
          // }, 100);
        });
      
        // // Ready
        this.player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          // play the song you need once the device is initialized
          this.setState({
            isPlayerReady: true,
          }, () => {
            const range = document.querySelector('.range')
            const bubble = document.querySelector('.bubble');
            // this.setBubble(range, bubble);
          })
        });
      
        // // Not Ready
        this.player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });
      
        // // Connect to the player!
        this.player.connect()
        .then(res => {
          console.log('ressssssss', res);
        })
        .catch(err => console.log(err));
      };
    }).catch(() => {
      console.log('ERRRRRR');
    })
  }

  onPlaySong = (uri) => {
    const play = ({
      spotify_uri,
      playerInstance: {
        _options: {
          getOAuthToken,
          id
        }
      }
    }) => {
      getOAuthToken(access_token => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri], position_ms: this.state.musicPosition || 0 }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
      });
    };
    play({
      playerInstance: this.player,
      spotify_uri: 'spotify:track:6uVzfibKnRIfDBByubw3bB',
    });
  }
  onPauseSong = (uri) => {
    const pause = ({
      spotify_uri,
      playerInstance: {
        _options: {
          getOAuthToken,
          id
        }
      }
    }) => {
      getOAuthToken(access_token => {
        console.log('id:', id)
        fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
      });
    };
    console.log('this.player:', this.player)
    pause({
      playerInstance: this.player,
      spotify_uri: 'spotify:track:6uVzfibKnRIfDBByubw3bB',
    });
  }

  getLyrics = async () => {
    try {
      const { lyrics } = await (await fetch(`/get_lyrics?artist=Sexion d'Assaut&song=wati bon son`)).json();
      // lyrics.split(/\r\n|\r|\n/).length ====> let you count the number of lines
      console.log('lyrics:', lyrics)
      this.setState({
        lyrics,
      });
    } catch (err) {
      console.log('There was an error in the getLyrics call:', err)
      return 'No lyrics found';
    } 
  }
  handleScroll = (e) => {
    const position = e.target.scrollTop + e.target.offsetHeight;
    const max = e.target.scrollHeight;
    const scrollContainer = document.getElementsByClassName('lyrics_scroll-area');
    const bottom = scrollContainer[0].getBoundingClientRect().bottom;
    const spans = document.getElementsByTagName('span');
    for(let i = 0; i < spans.length; i++) {
      const spanTop = spans[i].getBoundingClientRect().top;
      if (spanTop <= bottom || position === max) {
        spans[i].classList.add("lyrics_scroll-span");
      } else {
        spans[i].classList.remove("lyrics_scroll-span");
      }
    }
  }
  setBubble = (range, bubble) => {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    // bubble.innerHTML = val;
  
    // Sorta magic numbers based on size of the native UI thumb
    // bubble.style.left = `0px`;
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
  }

  handleInput = (e) => {
    console.log(e.target.value);
    const buble = document.querySelector('.bubble');
    this.setBubble(e.target, buble);
    this.setState({
      inputValue: e.target.value,
    })
  }

  async componentDidMount() {
    this.onScriptLoad();
    try {
      const { lyrics } = await (await fetch(`/get_lyrics?artist=Joe Budden&song=pump it up`)).json();
      this.setState({
        lyrics: lyrics.split('\n'),
      })
      return lyrics;
    } catch (err) {
      console.log('There was an error in the getLyrics call:', err)
      return 'No lyrics found';
    } 
  }
  render() {
    const { lyrics, inputValue, isPlayerReady, bubbleValue } = this.state;
    return (
      <div className='lyrics-container'>
        <LyricsView lyrics={lyrics}
          handleInput={this.handleInput}
          inputValue={inputValue}
          onPlaySong={this.onPlaySong}
          onPauseSong={this.onPauseSong}
          isPlayerReady={isPlayerReady}
          bubbleValue={bubbleValue}
          handleScroll={this.handleScroll}/>
      </div>
    )
  }
}
