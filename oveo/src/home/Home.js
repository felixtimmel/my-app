import React from 'react'
import HomepageView from './HomeView'
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Home extends React.Component {
    constructor() {
        super();
        const params = this.getHashParams(); 
        const token = params.access_token
        console.log(token)
        if (token) {
            spotifyWebApi.setAccessToken(token)
        }
        this.state ={
            loggedIn: token ? true : false,
            nowPlaying: {
                name: 'Not Checked',
                image: ''
            }
        }
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
                console.log(response)
                this.setState({
                    nowPlaying: {
                        name: response.item.name,
                        image: response.item.album.images[0].url
                    }
                })
            })
            .catch(err => console.log(err))
    }

    recentTracks(){
        spotifyWebApi.getMyRecentlyPlayedTracks()
            .then((response) => { response.items })
    }
    
    render() {
        return (
            <>
                <HomepageView nowPlaying={ this.state.nowPlaying } getNowPlaying={this.getNowPlaying} recentTracks={ this.recentTracks } />
            </>
        );
    }
}

export default Home