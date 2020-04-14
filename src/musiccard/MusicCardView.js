import React from 'react';
import Play_btn from '../_assets/4_HOME/playbtn.svg';

const MusicCardView = ({name, artist, image}) => {
    return (
        <>    
            <div className="music_card__img">
                <img src={image} /* style={{width: 40}} *//>
            </div>
            <div className="music_card__info">
                <div className="music_card__content">
                    <p className="song-tilte">{name}</p>
                    <p className="song-artist">{artist}</p>
                </div>
                <div className="music_card__play_btn">
                    <img src={Play_btn} alt="play button"/>
                </div>
            </div>
        </>
    )
}

export default MusicCardView;