import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();

class SpotifyClass {
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
		spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      return {
        name: response.item.name,
        image: response.item.album.images[0].url
      }
    })
    .catch(err => console.log(err))
  }

  recentTracks = () => {
		spotifyWebApi.getMyRecentlyPlayedTracks()
		.then((response) => {
				this.setState({
						lastSongs: response.items
				})
		})
  }

  getUser = () => {
    return spotifyWebApi.getMe()
    .then(res => res)
  }

  search = (query, types) => {
		spotifyWebApi.search(query, types)
    .then((response) => {
      console.log(response.tracks.items.slice(0, 10))
      this.setState({
        searchTracks: response.tracks.items.slice(0, 10),
        isSearching: true,
      })
    });
  }

  setToken = () => {
    const tokens = this.getHashParams();
    spotifyWebApi.setAccessToken(tokens.access_token);
  }

  onLoginToSpotify = () => {
    window.open('http://localhost:8888/spotify-login', '_self');
  }
}

export default SpotifyClass;