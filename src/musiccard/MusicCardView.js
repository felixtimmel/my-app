import React from 'react';

const MusicCardView = ({name, artist, image}) => {
    return (
        <>
            <div className="music_card">
                <div className="music_card_img">
                    <img src={image} style={{width: 40}}/>
                </div>
                <div className="music_card_content">
                    <p className="song-tilte">{name}</p>
                    <p className="song-artist">{artist}</p>
                </div>
            </div>
        </>
    )
}

export default MusicCardView;