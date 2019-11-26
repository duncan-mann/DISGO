import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

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
  // console.log(props.artistName)
  return(
    <div className={classes.MusicControls}>
      <div >
        <img className={classes.prevAlbum} src={props.prevAlbumCover} />
        <img src={props.currentAlbumCover} />
        <img className={classes.nextAlbum} src={props.nextAlbumCover} />
      </div>
      <p className={classes.song}>{props.trackName}</p>
      <p className={classes.songInfo}>{props.artistName && props.artistName.join(", ")}</p>
      <div className='MusicControls'>
        <SkipPreviousIcon onClick={props.handlePrev} fontSize='large' aria-label='previous' color="secondary" />
        {props.playing
          ? <PauseIcon onClick={props.handleToggle} fontSize='large' aria-label='Playing' color="secondary" />
          : <PlayArrowIcon onClick={props.handleToggle} fontSize='large' aria-label='Paused' color='secondary' />
        }
        <SkipNextIcon onClick={props.handleNext} fontSize='large' aria-label='next' color='secondary' />
        <ShuffleIcon fontSize='large' aria-label='shuffle' color='secondary'/>
        <RepeatIcon onClick={props.handleRepeat} fontSize='large' aria-label='repeat' color='secondary' />
        <RepeatOneIcon fontSize='large' aria-label='repeatOne' color='secondary' />
        <PlaylistAddIcon fontSize='large' aria-label='export-playlist' color='secondary'/>
        <VolumeUpIcon fontSize='large' aria-label='volume-on' color='secondary'/>
        <VolumeOffIcon fontSize='large' aria-label='volume-off' color='secondary'/>
      </div>
    </div>
  );
}