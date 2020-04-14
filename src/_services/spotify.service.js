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
		return spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => response)
    .catch(err => console.log(err))
  }

	recentTracks = () => {
		spotifyWebApi.getMyRecentlyPlayedTracks()
		.then((response) => {
				this.setState({
						lastSongs: response.items.slice(0, 10).map((item) => item.track)
				})
		})
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

	clearInput = () => {
		this.setState({
			value: '',
			isSearching: false,
		});
	}

  getUserInfo = () => {
		spotifyWebApi.getMe()
			.then((response) => {
				console.log(response)
				this.setState({
					userInfo: {
						username: response.display_name,
						avatar: response.images[0].url
					}
				})
			})
	}

	topTracks = () => {
		spotifyWebApi.getMyTopTracks()
		.then((response) => {
			console.log(response.items)
			this.setState({
				topTracks: response.items
			})
		})
	}

  onLoginToSpotify = () => {
    window.open('http://localhost:8888/spotify-login', '_self')
  }
}

export default SpotifyClass;