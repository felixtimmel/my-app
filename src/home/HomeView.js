import React from 'react';

const HomepageView = ({ nowPlaying, getNowPlaying, recentTracks }) => {
    return (
        <>
            <h2>Test</h2>
            <div>
                {recentTracks()}
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