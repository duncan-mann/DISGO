import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import { flexbox } from '@material-ui/system';
import { useMediaQuery } from 'react-responsive';


const useStyles = makeStyles(theme => ({
  MusicControls: {
    'background': `linear-gradient(#212121 50%, #121212 90%)`,
    'color': 'white',
    'text-align': 'center'
  },
  song: {
    'font-size': 20
  },
  songInfo: {
    color: '#b3b3b3'
  },
  carousel: {
    display: flexbox,
    'flex-direct': 'row',
  },
  currentAlbum: {
    'z-index': 2,
    'width': 'auto',
    'height': 'auto',
    'max-width': '40vw',
    'max-height': '40vh'
  },
  nextAlbum: {
    'margin-bottom': 60,
    height: 200,
    'margin-right': 10,
    '-webkit-box-reflect': 'below 0 -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.75, transparent), to(white))',
    '-webkit-transform': 'skewY(4deg)'
  },
  nextAlbum2: {
    'margin-bottom': 60,
    height: 150,
    opacity: 0.2,
    '-webkit-box-reflect': 'below 0 -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.75, transparent), to(white))',
    '-webkit-transform': 'skewY(4deg)'
  },
  prevAlbum: {
    'margin-bottom': 60,
    'margin-left': 10,
    height: 200,
    '-webkit-box-reflect': 'below 0 -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.75, transparent), to(white))',
    '-webkit-transform': 'skewY(-4deg)',
  },
  prevAlbum2: {
    'margin-bottom': 60,
    'margin-left': 10,
    height: 150,
    opacity: 0.2,
    '-webkit-box-reflect': 'below 0 -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.75, transparent), to(white))',
    '-webkit-transform': 'skewY(-4deg)'
  },
}))


export default function MusicControls(props) {
  const classes = useStyles();
  const bigScreen = useMediaQuery({ minWidth: 1100 })
  const medScreen = useMediaQuery({ minWidth: 700, maxWidth: 1099})
  const smallScreen = useMediaQuery({ maxWidth: 699})


  let allAlbums = [<img className={classes.currentAlbum} src={props.currentAlbumCover} alt='' />]
  let albumsMed = [<img className={classes.currentAlbum} src={props.currentAlbumCover} alt='' />]
  let albumsSmall = [<img className={classes.currentAlbum} src={props.currentAlbumCover} alt='' />]

  if (props.prevAlbumCover[0]) {
    allAlbums.unshift(<img className={classes.prevAlbum} src={props.prevAlbumCover[0]} alt='' />)
    allAlbums.push(<img className={classes.nextAlbum} src={props.nextAlbumCover[0]} alt='' />)
    albumsMed.unshift(<img className={classes.prevAlbum} src={props.prevAlbumCover[0]} alt='' />)
    albumsMed.push(<img className={classes.nextAlbum} src={props.nextAlbumCover[0]} alt='' />)
  }

  if (props.prevAlbumCover[1]) {
    allAlbums.unshift(<img className={classes.prevAlbum2} src={props.prevAlbumCover[1]} alt='' />)
    allAlbums.push(<img className={classes.nextAlbum2} src={props.nextAlbumCover[1]} alt='' />)
  }

  return (
    <div className={classes.MusicControls}>

      {bigScreen &&
        <div >
          {allAlbums}
        </div>
        }

      {medScreen &&
        <div >
          {albumsMed}
        </div>
        }

      {smallScreen &&
        <div >
          {albumsSmall}
        </div>
        }
      
      <p className={classes.song}>{props.trackName}</p>
      <p className={classes.songInfo}>{props.artistName && props.artistName.join(", ")}</p>

      <div className='MusicControls'>
        <SkipPreviousIcon onClick={props.handlePrev} fontSize='large' aria-label='previous' color='error' />
        {props.playing
          ? <PauseIcon onClick={props.handleToggle} fontSize='large' aria-label='Playing' color='error' />
          : <PlayArrowIcon onClick={props.handleToggle} fontSize='large' aria-label='Paused' color='error' />
        }

        <SkipNextIcon onClick={props.handleNext} fontSize='large' aria-label='next' color='error' />
        <ShuffleIcon fontSize='large' aria-label='shuffle' color='error' />
        <RepeatIcon onClick={props.handleRepeat} fontSize='large' aria-label='repeat' color='error' />
        <RepeatOneIcon fontSize='large' aria-label='repeatOne' color='error' />
        <PlaylistAddIcon fontSize='large' aria-label='export-playlist' color='error' />
        <VolumeUpIcon fontSize='large' aria-label='volume-on' color='error' />
        <VolumeOffIcon fontSize='large' aria-label='volume-off' color='error' />

      </div>
    </div>
  );
}