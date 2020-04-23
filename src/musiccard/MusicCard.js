import React from 'react';
import MusicCardView from './MusicCardView';

require('./MusicCard.scss')

const MusicCard = ({name, artist, image, getMusicInfo}) => {
    return (
        <MusicCardView name={name} artist={artist} image={image} getMusicInfo={getMusicInfo}/>
    )
}

export default MusicCard;