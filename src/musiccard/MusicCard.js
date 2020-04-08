import React from 'react';
import MusicCardView from './MusicCardView'

const MusicCard = ({name, artist, image}) => {
    return (
        <MusicCardView name={name} artist={artist} image={image}/>
    )
}

export default MusicCard;