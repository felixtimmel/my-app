import React from 'react';
import play from '../_assets/logos/play.svg';
import pause from '../_assets/logos/pause.svg';

export default function LyricsView({lyrics, handleScroll, onPlaySong, onPauseSong}) {
  return (
    <div className='lyrics'>
      <div className="lyrics_scroll" onScroll={(e) => handleScroll(e)}>
        <div className="lyrics_scroll-area"></div>
        {lyrics.map((ly, idx) => (
          <span key={idx}>{ly} <br/></span>
          
        ))}
      </div>
      <div className="lyrics_player-container">
        <button onClick={() => onPlaySong()}>
          <img src={play} alt="play/pause"/>
        </button>
        <button onClick={() => onPauseSong()}>
          <img src={pause} alt="play/pause"/>
        </button>
      </div>
    </div>
  )
}