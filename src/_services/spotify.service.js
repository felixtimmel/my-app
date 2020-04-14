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
    .then((response) => response.items.slice(0, 10).map((item) => item.track))
	}

  getUser = () => {
    return spotifyWebApi.getMe()
    .then(res => res)
  }

  search = (query, types) => {
		return spotifyWebApi.search(query, types)
    .then((response) => response.tracks.items.slice(0, 10));
  }

  setToken = () => {
		const tokens = this.getHashParams();
		this.access_token = tokens.access_token;
		this.refresh_token = tokens.refresh_token;
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
    window.open('http://localhost:8888/spotify-login', '_self');
  }
}

export default SpotifyClass;