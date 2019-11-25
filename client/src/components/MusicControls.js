import React from 'react';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  MusicControls : {
    // 'background' : `linear-gradient(#212121 50%, #121212 90%)`,
    'color': 'white',
    'text-align': 'center'
  },
  song: {
    color: 'white',
    'font-size': 20
  },
  songInfo: {
    color: '#b3b3b3'
  },
  nextAlbum: {
    margin: 60,
    height: 200,
    opacity: 0.2,
    '-webkit-box-reflect': 'below 0 -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.5, transparent), to(white))',
    '-webkit-transform': 'skewY(3deg)'
  },
  prevAlbum: {
    margin: 60,
    height: 200,
    opacity: 0.2,
    '-webkit-box-reflect': 'below 0 -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.5, transparent), to(white))',
    '-webkit-transform': 'skewY(-3deg)'
  }
}))

export default function MusicControls (props) {
  const classes = useStyles();

  return(
    <div className={classes.MusicControls}>
      <div >
        <img className={classes.prevAlbum} src={props.prevAlbumCover} />
        <img src={props.currentAlbumCover} />
        <img className={classes.nextAlbum} src={props.nextAlbumCover} />
      </div>
      <p className={classes.song}>{props.trackName}</p>
      <p className={classes.songInfo}>{props.artistName}</p>
      <div className='MusicControls'>
        <SkipPreviousIcon onClick={props.handlePrev} fontSize='large' aria-label='previous' color='white' />
        {props.playing
          ? <PauseIcon onClick={props.handleToggle} fontSize='large' aria-label='Playing' color='white' />
          : <PlayArrowIcon onClick={props.handleToggle} fontSize='large' aria-label='Paused' color='white' />
        }
        <SkipNextIcon onClick={props.handleNext} fontSize='large' aria-label='next' color='white' />
        <RepeatIcon onClick={props.handleRepeat} fontSize='large' aria-label='repeat' color='white' />
      </div>
    </div>
  );
}