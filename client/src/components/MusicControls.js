import React from 'react';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';

export default function MusicControls (props) {
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
        <SkipNextIcon onClick={props.handleNext} fontSize='large' aria-label='next' color='primary'>Next</SkipNextIcon>
        {/* <button onClick={props.handleNext}>Next</button> */}
        <RepeatIcon onClick={props.handleRepeat('context')} aria-label='repeat' color='secondary' />
      </p>
    </div>
  );
}