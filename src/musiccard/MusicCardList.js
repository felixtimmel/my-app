import React from 'react';
import MusicCard from './MusicCard';

const MusicCardList = ({ lastSongs, isSearching, searchTracks }) => {
    if (isSearching) {
        return (
            <div className="music-card_list">
                {searchTracks && searchTracks.length
                ? searchTracks.map((item) => <MusicCard  name={item.name} artist={item.artists[0].name} image={item.album.images[0].url} key={item.id}/>)
                : null}
            </div>
        ) 
    }
    return (
        <div className="music-card_list">
            {lastSongs && lastSongs.length
            ? lastSongs.map((item) => <MusicCard  name={item.track.name} artist={item.track.artists[0].name} image={item.track.album.images[0].url} key={item.track.id}/>)
            : null}
        </div>
    )
}

export default MusicCardList;