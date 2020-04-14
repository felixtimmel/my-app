import React from 'react'
import HomepageView from './HomeView'

require('./Home.scss');

class Home extends React.Component {
	constructor(props) {
		super(props);
		console.log('&&&&&&&&&', this.props)
		const params = this.props.spotifyClass.getHashParams(); 
		this.token = params.access_token
		if (this.token) {
		}
		this.state = {
			loggedIn: this.token ? true : false,
			userInfo: {
				username: '',
				avatar: '',
			},
			nowPlaying: {
				name: 'Not Checked',
				image: ''
			},
			lastSongs: [],
			userTopTracks: [],
			searchTracks: [],
			isSearching: false,
			value: '',
		}
	}

	clearInput = () => {
		this.setState({
				value: '',
				isSearching: false,
		});
	}

	handleChange = (e) => {
		const types = ['album', 'artist', 'track'];
		this.search(e.target.value, types);
		this.setState({
			value: e.target.value,
		});
	}

	getHashParams() {
		this.props.spotifyClass.getHashParams()
	}

	getNowPlaying = () => {
		this.props.spotifyClass.getNowPlaying()
		.then((response) =>
			this.setState({
				nowPlaying: {
					name: response.item.name,
					image: response.item.album.images[0].url
				}
			}))
	}

	getUserInfo = () => {
		this.props.spotifyClass.getUserInfo()
			.then((response) => {
				this.setState({
					userInfo: {
						username: response.display_name,
						avatar: response.images[0].url
					}
				})
			})
	}

	topTracks = () => {
		this.props.spotifyClass.topTracks()
		.then((response) => {
			this.setState({
				userTopTracks: response.items
			})
		})
	}

	recentTracks = () => {
		this.props.spotifyClass.recentTracks()
		.then((response) => {
				this.setState({
						lastSongs: response.items.slice(0, 10).map((item) => item.track)
				})
		})
	}

	search = () => {
		this.props.spotifyClass.search()
			.then((response) => {
				this.setState({
					searchTracks: response.tracks.items.slice(0, 10),
					isSearching: true,
				})
			});
	}

	componentDidMount() {
		if (this.token) {
			this.recentTracks();
			this.getUserInfo();
			this.topTracks();
		}
	}

	render() {
		if (this.token) {
				return (
					<div className="homepage-container">
						<HomepageView nowPlaying={ this.state.nowPlaying } getNowPlaying={this.getNowPlaying()} 
							lastSongs={this.state.lastSongs} searchFunction={this.search()}
							isSearching={this.state.isSearching} searchTracks={this.state.searchTracks}
							handleChange={this.handleChange()}
							value={this.state.value}
							clearInput={this.clearInput()}
							userInfo={this.state.userInfo}
							topTracks={this.state.userTopTracks}
						/>
					</div>
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