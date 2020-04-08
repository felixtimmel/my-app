import React from 'react';
import MusicCard from './MusicCard';

const MusicCardList = ({ lastSongs }) => {
    return (
        <div className="music-card_list">
            {lastSongs && lastSongs.length
            ? lastSongs.map((item) => <MusicCard  name={item.track.name} artist={item.track.artists[0].name} image={item.track.album.images[0].url} key={item.track.id}/>)
            : null}
        </div>
    )
}

export default MusicCardList;