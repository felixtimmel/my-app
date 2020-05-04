import React from 'react';
import play from '../_assets/logos/play.svg';
import pause from '../_assets/logos/pause.svg';
import logo from '../_assets/splash_screen/logo_oveo.png';

export default function LyricsView({lyrics, handleScroll, onPlaySong, onPauseSong, musicInfo, convertTime, goback}) {
  console.log(lyrics)
  return (
    <>  
      <div className='song_header'>
        <button onClick={() => goback()} className="song_header-back-btn">
          <i className="fas fa-chevron-left"></i>
        </button>
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
        {lyrics === []
          ? 
          <div className='load_logo'><img src={logo} alt="oveo_logo" /></div>
          :
          <div className="lyrics_scroll" onScroll={(e) => handleScroll(e)}>
            <div className="lyrics_scroll-area"></div>
            {lyrics.map((ly, idx) => (
              <span key={idx}>{ly} <br/></span>       
            ))}
          </div>
        }
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
            <div className="inside-progression-bar" style={{width: "5%"}}></div> {/* have to be dynamique */}
          </div>
          <p>{convertTime(musicInfo.time)}</p>
        </div>
      </div>
    </>
  )
}