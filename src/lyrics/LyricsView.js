import React from 'react';
import play from '../_assets/logos/play.svg';
import pause from '../_assets/logos/pause.svg';

export default function LyricsView({lyrics, handleScroll, onPlaySong, onPauseSong, musicInfo, convertTime, goback}) {
  return (
    <>  
      <div className='song_header'>
        <i onClick={() => goback()} className="fas fa-chevron-left"></i>
        <img src={musicInfo.userInfo.avatar} alt='img' className="song_header__avatar-profil"/>
      </div>
      <div className='song_intro'>
        <div className='song_intro__first-part'>
          <img src={musicInfo.imgUrl} alt='song_img' className='song_intro__pic'/>
          <div className='song_intro__description'>
            <p className='song_intro__description_song-name'>{musicInfo.songName}</p>
            <p className='song_intro__description_song-artist'>{musicInfo.artist}</p>
          </div>
        </div>
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div className='lyrics'>
        <div className="lyrics_scroll" onScroll={(e) => handleScroll(e)}>
          <div className="lyrics_scroll-area"></div>
          {lyrics.map((ly, idx) => (
            <span key={idx}>{ly} <br/></span>
            
          ))}
        </div>
        <div className="lyrics_player-container">
          <div className="lyrics_player-container_btns">
            <button onClick={() => onPlaySong()}>
              <img src={play} alt="play/pause"/>
            </button>
            <button onClick={() => onPauseSong()}>
              <img src={pause} alt="play/pause"/>
            </button>
          </div>
          <div className="progression-bar">
            <div className="inside-progression-bar" style={{width: "20%"}}></div> {/* have to be dynamique */}
          </div>
          <p>{convertTime(musicInfo.time)}</p>
        </div>
      </div>
    </>
  )
}