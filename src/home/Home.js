import React from 'react'
import HomepageView from './HomeView'
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Home extends React.Component {
	constructor() {
		super();
		const params = this.getHashParams(); 
		this.token = params.access_token
		if (this.token) {
			spotifyWebApi.setAccessToken(this.token)
		}
		this.state = {
			loggedIn: this.token ? true : false,
			nowPlaying: {
				name: 'Not Checked',
				image: ''
			},
			lastSongs: [],
			searchTracks: [],
			isSearching: false,
			value: '',
		}
	}

	handleChange = (e) => {
		/*  const types = ['album', 'artist', 'track', 'playlist']; */
		const types = ['album', 'artist', 'track'];
		this.search(e.target.value, types);
		this.setState({
			value: e.target.value,
		});
	}

	clearInput = () => {
		this.setState({
				value: '',
				isSearching: false,
		});
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
		spotifyWebApi.getMyCurrentPlaybackState()
			.then((response) => {
					this.setState({
							nowPlaying: {
									name: response.item.name,
									image: response.item.album.images[0].url
							}
					})
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

	componentDidMount() {
		// this.recentTracks();
	}

	render() {
		if (this.token) {
				return (
					<>
						<HomepageView nowPlaying={ this.state.nowPlaying } getNowPlaying={this.getNowPlaying} 
							lastSongs={this.state.lastSongs} searchFunction={this.search}
							isSearching={this.state.isSearching} searchTracks={this.state.searchTracks}
							handleChange={this.handleChange}
							value={this.state.value}
							clearInput={this.clearInput}
						/>
					</>
				);
		}
		return (
			<div>
				<a href="http://localhost:8888/spotify-login">
						<button>Login in with spotify</button>
				</a>
			</div>
		)
	}
}

export default Home;