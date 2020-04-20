import React from 'react'
import HomepageView from './HomeView'
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

require('./Home.scss');

class Home extends React.Component {
	constructor(props) {
		super(props);
		console.log('&&&&&&&&&', this.props)
		this.token = this.props.spotifyClass.access_token
		console.log('&&&&&&&&&', this.token)
		this.state = {
			registered: this.props.user,
			loggedIn: this.token ? true : false,
			userInfo: {
				username: '',
				avatar: '',
			},
			nowPlaying: {
				name: 'Not Checked',
				image: ''
			},
			musicInfo: {
				name: '',
				artist: '',
				uri: ''
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

	getMusicInfo = (item) => {
		const musicName = item.name;
		const musicArtist = item.artists[0].name;
		const musicUri = item.uri;
		
		this.setState({
			musicInfo: {
				name: musicName,
				artist: musicArtist,
				uri: musicUri
			}
		})
		this.props.history.push({
			pathname: '/params',
			state: { detail: this.state.musicInfo }
		})
	}

	componentDidMount() {
		console.log(this.state.registered)
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
							getMusicInfo={this.getMusicInfo}
							musicInfo={this.state.musicInfo}
						/>
					</div>
				);
			}
			return (
				<Redirect to='/connect_to_spotify'/>
			)
		/* } else if (!this.state.registered) {
				return (
					<Redirect to='/login'/>
				)
		} else {
				return (
					<Redirect to='/connect_to_spotify'/>
				) */
	}
}

export default withRouter(Home);