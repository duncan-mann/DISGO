import React from 'react';

export default function MusicControls (props) {
  console.log(props.prevAlbumCover)
  console.log(props.nextAlbumCover)
  
  return(
    <div className='MusicControls'>
      <h1>Music Player Controls</h1>
      <div className='albumCovers'>
        <img src={props.prevAlbumCover} />
        <img src={props.currentAlbumCover} />
        <img src={props.nextAlbumCover} />
      </div>
      <p>Song Title: {props.trackName}</p>
      <p>Artist Name: {props.artistName}</p>
      <p>Album Name: {props.albumName}</p>
      <p>
        <button onClick={props.handlePrev}>Previous</button>
        <button onClick={props.handleToggle}>{props.playing ? 'Pause' : 'Play'}</button>
        <button onClick={props.handleNext}>Next</button>
      </p>
    </div>
  );
}