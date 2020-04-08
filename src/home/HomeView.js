import React from 'react';
import MusicCardList from '../musiccard/MusicCardList';
import SearchBar from '../searchbar/Searchbar';

const HomepageView = ({ nowPlaying, getNowPlaying, lastSongs, searchFunction }) => {
    
    return (
        <>
            <h2>Bonjour</h2>
            <div>
                {<SearchBar search={searchFunction} />}
            </div>
            <div>
                <MusicCardList lastSongs={lastSongs}/>
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