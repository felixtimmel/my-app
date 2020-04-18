import React from 'react';
import MusicCard from './MusicCard';

const MusicCardList = ({ lastSongs, isSearching, searchTracks, topTracks, getMusicInfo }) => {
    if (isSearching) {
        return (
            <div className="vertical-music-card_list">
                {searchTracks && searchTracks.length
                ? searchTracks.map((item) => 
                    <div className="vertical-music_card" onClick={() => getMusicInfo(item)}>
                        <MusicCard  name={item.name} artist={item.artists[0].name} image={item.album.images[0].url} key={item.id}/>
                    </div>
                )
                : null}
            </div>
        ) 
    }
    return (
        <>
            <div className="horizontal-music-card_list">               
                {lastSongs && lastSongs.length
                ? lastSongs.map((item) => 
                    <div className="horizontal-music_card" onClick={() => getMusicInfo(item)}>
                        <MusicCard  name={item.name} artist={item.artists[0].name} image={item.album.images[0].url} key={item.id}/>
                    </div>  
                    )
                : null}
            </div>
            <div className="vertical-music-card_list">
                {topTracks && topTracks.length
                ? topTracks.map((item) => 
                    <div className="vertical-music_card" onClick={() => getMusicInfo(item)}>
                        <MusicCard  name={item.name} artist={item.artists[0].name} image={item.album.images[0].url} key={item.id}/>
                    </div>        
                )
                : null}
            </div>
        </>
    )
}

export default MusicCardList;