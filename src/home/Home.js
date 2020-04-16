import React from 'react'
import HomepageView from './HomeView'

require('./Home.scss');

class Home extends React.Component {
	constructor(props) {
		super(props);
		console.log('&&&&&&&&&', this.props)
		this.token = this.props.spotifyClass.access_token
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
					name: response.name,
					image: response.image
				}
			}))
	}

	getUserInfo = () => {
		this.props.spotifyClass.getUser()
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
			console.log(response.topTracks)
			this.setState({
				userTopTracks: response.topTracks
			})
		})
	}

	recentTracks = () => {
		this.props.spotifyClass.recentTracks()
		.then((response) => {
				this.setState({
						lastSongs: response
				})
		})
	}

	search = (query, types) => {
		this.props.spotifyClass.search(query, types)
			.then((response) => {
				this.setState({
					searchTracks: response,
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
						<HomepageView nowPlaying={ this.state.nowPlaying } getNowPlaying={this.getNowPlaying} 
							lastSongs={this.state.lastSongs} searchFunction={this.search}
							isSearching={this.state.isSearching} searchTracks={this.state.searchTracks}
							handleChange={this.handleChange}
							value={this.state.value}
							clearInput={this.clearInput}
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