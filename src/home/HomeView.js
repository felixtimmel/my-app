import React from 'react';
import MusicCardList from '../musiccard/MusicCardList';
import SearchBar from '../searchbar/Searchbar';

const HomepageView = ({
	nowPlaying,
	getNowPlaying,
	lastSongs,
	searchFunction,
	isSearching,
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
				<img src={userInfo.avatar} className="homeGreeting__avatar"/>
			</div>
			
			<div className="searchbar">
				{<SearchBar clearInput={clearInput} 
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
						<p><strong>Vos dernières écoutes</strong></p>
						<MusicCardList lastSongs={lastSongs} isSearching={isSearching}/>
					</div>
					<div className="topTracks">
						<p><strong>Vos top Tracks</strong></p>
						<MusicCardList topTracks={topTracks} isSearching={isSearching}/>
					</div>
					{/* <div>
						<a href="http://localhost:8888/spotify-login">
								<button>Login in with spotify</button>
						</a>
					</div> */}
					<div>
						Now playing : { nowPlaying.name }
					</div>
					<div>
						<img src={nowPlaying.image} style={{width: 100}}/>
					</div>
					<button onClick={ () => getNowPlaying() }>
						Check Now playing
					</button>
				</>
			}
		</>
	)
}

export default HomepageView