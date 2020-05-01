import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();

class SpotifyClass {
	constructor() {
		this.access_token = null;
		this.refresh_token = null;
	}

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying = () => {
		return spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      return {
        name: response.item.name,
        image: response.item.album.images[0].url
      }
    })
    .catch(err => console.log(err))
  }

	recentTracks = () => {
		return spotifyWebApi.getMyRecentlyPlayedTracks()
    .then((response) => response.items.map((item) => item.track))
	}

  getUser = () => {
    return spotifyWebApi.getMe()
    .then(res => res)
    .catch(err => {
      if (err.message === 'The access token expired') {
        return err;
      }
    })
  }

  search = (query, types) => {
		return spotifyWebApi.search(query, types)
    .then((response) => response.tracks.items.slice(0, 10));
  }

  setToken = (spotifyToken) => {
    let tokens;
    if (spotifyToken) {
      this.access_token = spotifyToken;
      return spotifyWebApi.setAccessToken(spotifyToken);
    } else {
      tokens = this.getHashParams();
      this.access_token = tokens.access_token;
      this.refresh_token = tokens.refresh_token;
    }
    return spotifyWebApi.setAccessToken(tokens.access_token);
  }

	topTracks = () => {
		return spotifyWebApi.getMyTopTracks()
		.then((response) => {
			return {
				topTracks: response.items
			}
		})
	}

  onLoginToSpotify = () => {
    if (process.env.NODE_ENV === 'development') {
      window.open('http://localhost:8888/spotify-login', '_self');
    } else {
      window.open(`${process.env.REACT_APP_API_URL}/spotify-login`, '_self');
    }
  }
}

export default SpotifyClass;