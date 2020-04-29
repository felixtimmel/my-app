import React from 'react'
import HomepageView from './HomeView'
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import loadSpotifySdk from '../_services/spotifySdk';

require('./Home.scss');

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.token = this.props.SpotifyClass.access_token
		this.state = {
			token: null,
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
		this.props.SpotifyClass.getHashParams()
	}

	getNowPlaying = () => {
		this.props.SpotifyClass.getNowPlaying()
		.then((response) =>
			this.setState({
				nowPlaying: {
					name: response.name,
					image: response.image
				}
			}))
	}

	getUserInfo = () => {
		this.props.SpotifyClass.getUser()
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
		this.props.SpotifyClass.topTracks()
		.then((response) => {
			this.setState({
				userTopTracks: response.topTracks
			})
		})
	}

	recentTracks = () => {
		this.props.SpotifyClass.recentTracks()
		.then((response) => {
			const filteredresponse = []
			const map = new Map();
			for (const item of response) {
				if(!map.has(item.id)) {
					map.set(item.id, true);
					filteredresponse.push({
						id: item.id,
						name: item.name,
						artist: item.artists[0].name,
						url: item.album.images[0].url,
						uri: item.uri
					});
				}
			}
				this.setState({
						lastSongs: filteredresponse
				})
		})
	}



	search = (query, types) => {
		this.props.SpotifyClass.search(query, types)
		.then((response) => {
			this.setState({
				searchTracks: response,
				isSearching: true,
			})
		});
	}

	getMusicInfo = (item) => {
		const musicInfo = {
			songName: item.name,
			artist: item.artists && item.artists[0] ? item.artists[0].name : item.artist,
			spotifyUri: item.uri,
			imgUrl: item.album && item.album.images && item.album.images[0] ? item.album.images[0].url : item.url,
			token: this.token,
			userInfo : this.state.userInfo
		};
		this.props.history.push({
			pathname: '/song',
			state: { musicInfo: musicInfo }
		})
	}

	initHomePage = async() => {
		const { firebaseClass, SpotifyClass, user: { uid } } = this.props;
		try {
			const user = await firebaseClass.db.collection('users').doc(uid).get();
			if (user.exists) {
				SpotifyClass.setToken(user.data().access_token);
				// if (!window.isScriptLoaded) {
					await loadSpotifySdk(user.data().access_token);
				// }
				this.recentTracks();
				this.getUserInfo();
				this.topTracks();
				window.isScriptLoaded = true;
				this.setState({
					token: user.data().access_token,
				})
			}
		} catch(err) {
			console.log(`There was an error in get getSpotifyToken call: ${err}`);
		}
	}

	componentDidMount() {
		this.initHomePage();
	}

	render() {
		const { token } = this.state;
		return (
			<div className="homepage-container">
			{token && token.length
				? <HomepageView nowPlaying={ this.state.nowPlaying } getNowPlaying={this.getNowPlaying} 
						lastSongs={this.state.lastSongs} searchFunction={this.search}
						isSearching={this.state.isSearching} searchTracks={this.state.searchTracks}
						handleChange={this.handleChange}
						value={this.state.value}
						clearInput={this.clearInput}
						userInfo={this.state.userInfo}
						topTracks={this.state.userTopTracks}
						getMusicInfo={this.getMusicInfo}
						musicInfo={this.state.musicInfo}/>
				: 
					<div>THERE IS NO TOKEN FOR NOW</div>} {/** To do */}
			</div>
		);
	}
}

export default withRouter(Home);
