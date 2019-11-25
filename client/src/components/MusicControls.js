import React from 'react';

// import components

// import material-ui components
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

export default function MusicControls (props) {
  return(
    <div className='SongDetails'>
      <h1>Music Player Controls</h1>
      <div className='albumCovers'>
        <img src={props.prevAlbumCover} />
        <img src={props.currentAlbumCover} />
        <img src={props.nextAlbumCover} />
      </div>
      <p>Song Title: {props.trackName}</p>
      <p>Artist Name: {props.artistName}</p>
      <p>Album Name: {props.albumName}</p>
      <div className='MusicControls'>
        <SkipPreviousIcon onClick={props.handlePrev} fontSize='large' aria-label='previous' color='primary' />
        {props.playing
          ? <PauseIcon onClick={props.handleToggle} fontSize='large' aria-label='Playing' color='primary' />
          : <PlayArrowIcon onClick={props.handleToggle} fontSize='large' aria-label='Paused' color='primary' />
        }
        <SkipNextIcon onClick={props.handleNext} fontSize='large' aria-label='next' color='primary' />
        <RepeatIcon onClick={props.handleRepeat} fontSize='large' aria-label='repeat' color='secondary' />
        <RepeatOneIcon fontSize='large' aria-label='repeatOne' color='secondary' />
        <PlaylistAddIcon fontSize='large' aria-label='export-playlist' color='secondary'/>
      </div>
    </div>
  );
}