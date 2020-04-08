import React from 'react';
import MusicCardList from '../musiccard/MusicCardList';

const HomepageView = ({ nowPlaying, getNowPlaying, lastSongs }) => {
    return (
        <>
            <h2>Test</h2>
            <div>
                <MusicCardList lastSongs={lastSongs}/>
            </div>
            <div>
                <a href="http://localhost:8888/login">
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