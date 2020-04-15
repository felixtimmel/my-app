import React from 'react';
import MusicCardList from '../musiccard/MusicCardList';
import SearchBar from '../searchbar/Searchbar';
import Loupe from '../_assets/4_HOME/loupe.svg';
import SpotifyLogo from '../_assets/4_HOME/Image 3.svg';

const HomepageView = ({
	nowPlaying,
	getNowPlaying,
	lastSongs,
	searchFunction,
	isSearching,
	value,
	searchTracks,
	handleChange,
	clearInput,
	userInfo,
	topTracks
	}) => {    
		
	return (
		<>
			<div className="homeGreeting">
				<h2>
					<span style={{fontSize: "16px", fontWeight: 400}}>Bonjour,</span><br/> 
					{userInfo.username}
				</h2>
				<div className="homeGreeting__avatar">
					<img src={userInfo.avatar} className="homeGreeting__avatar-profil"/>
					<img src={SpotifyLogo} className="homeGreeting__spotify-logo"/>
				</div>
			</div>
			
			<div className="searchbar">
				<img src={Loupe} alt="search" className="searchbar__loupe"/>
				{<SearchBar clearInput={clearInput}
										value={value} 
										handleChange={handleChange} 
										search={searchFunction} 
										isSearching={isSearching}
				/>}
			</div>
			{isSearching && 
				<div className="musicCard">
						<MusicCardList searchTracks={searchTracks} isSearching={isSearching}/>
				</div>
			}
			{ !isSearching &&
				<>
					<div className="lastlistenning">
						<p className="homepage__subtitles">Vos dernières écoutes</p>
						<MusicCardList lastSongs={lastSongs} isSearching={isSearching}/>
					</div>
					<div className="topTracks">
						<p className="homepage__subtitles">Vos top Tracks</p>
						<MusicCardList topTracks={topTracks} isSearching={isSearching}/>
					</div>
					{/* <div>
						<a href="http://localhost:8888/spotify-login">
								<button>Login in with spotify</button>
						</a>
					</div> */}
					{/* <div>
						Now playing : { nowPlaying.name }
					</div>
					<div>
						<img src={nowPlaying.image} style={{width: 100}}/>
					</div>
					<button onClick={ () => getNowPlaying() }>
						Check Now playing
					</button> */}
				</>
			}
		</>
	)
}

export default HomepageView