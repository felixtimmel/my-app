import React from 'react';
import play from '../_assets/logos/play.svg';
import pause from '../_assets/logos/pause.svg';
// import ReactJkMusicPlayer from "react-jinke-music-player";
// import "react-jinke-music-player/assets/index.css";

export default function LyricsView({lyrics, handleScroll, handleInput, inputValue, onPlaySong, isPlayerReady, onPauseSong, bubbleValue}) {
  return (
    <div className='lyrics'>
      <div className="lyrics_scroll" onScroll={(e) => handleScroll(e)}>
        <div className="lyrics_scroll-area"></div>
        {lyrics.map((ly, idx) => (
          <span key={idx}>{ly}</span>
        ))}
      </div>
      {isPlayerReady
        ? <div className="lyrics_player-container">
            <button onClick={() => onPlaySong()}>
              <img src={play} alt="play/pause"/>
            </button>
            <button onClick={() => onPauseSong()}>
              <img src={pause} alt="play/pause"/>
            </button>
          </div>
        : null}
    </div>
  )
}



// return (
//   <div className='lyrics'>
//     <div className="lyrics_scroll" onScroll={(e) => handleScroll(e)}>
//       <div className="lyrics_scroll-area"></div>
//       {lyrics.map((ly, idx) => (
//         <span key={idx}>{ly}</span>
//       ))}
//     </div>
//     {isPlayerReady
//       ? <div className="lyrics_player-container">
//           <button onClick={() => onPlaySong()}>
//             <img src={play} alt="play/pause"/>
//           </button>
//           <button onClick={() => onPauseSong()}>
//             <img src={pause} alt="play/pause"/>
//           </button>
//           <input className='range' type="range" min="0" max="100" value={inputValue} onChange={(e) => handleInput(e)}/>
//           <output className="bubble"></output>
//           <span className="range-max">0</span>
//         </div>
//       : null}
//   </div>
// )