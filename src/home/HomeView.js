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
	topTracks,
	getMusicInfo,
	musicInfo
	}) => {    
		
	return (
		<>
			<div className="homeGreeting">
				<h2>
					<span style={{fontSize: "16px", fontWeight: 400}}>Bonjour,</span><br/> 
					{userInfo.username}
				</h2>
				<div className="homeGreeting__avatar">
					<img src={userInfo.avatar} alt='img' className="homeGreeting__avatar-profil"/>
					<img src={SpotifyLogo} alt='img' className="homeGreeting__spotify-logo"/>
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
			{isSearching && searchTracks.length > 0 &&
				<div className="musicCard">
					<MusicCardList searchTracks={searchTracks} isSearching={isSearching} getMusicInfo={getMusicInfo}/>
				</div>
			}
			<div className="lastlistenning">
				<p className="homepage__subtitles">Vos dernières écoutes</p>
				<MusicCardList lastSongs={lastSongs} isSearching={isSearching} getMusicInfo={getMusicInfo} musicInfo={musicInfo}/>
			</div>
			<div className="topTracks">
				<p className="homepage__subtitles">Vos top Tracks</p>
				<MusicCardList topTracks={topTracks} isSearching={isSearching} getMusicInfo={getMusicInfo}/>
			</div>
		</>
	)
}

export default HomepageView