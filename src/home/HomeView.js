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
    clearInput
    }) => {    
    return (
        <>
            <h2>Bonjour</h2>
            <div>
                {<SearchBar clearInput={clearInput} handleChange={handleChange} search={searchFunction} isSearching={isSearching}/>}
            </div>
            {isSearching && 
                <div>
                    <MusicCardList searchTracks={searchTracks} isSearching={isSearching}/>
                </div>
            }
            <div>
                <MusicCardList lastSongs={lastSongs} isSearching={isSearching}/>
            </div>
            <div>
                <a href="http://localhost:8888/spotify-login">
                    <button>Login in with spotify</button>
                </a>
            </div>
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
    )
}

export default HomepageView