import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { flexbox } from '@material-ui/system';
import { useMediaQuery } from 'react-responsive';
import ReactCardFlip from 'react-card-flip';
import SpotifyWidget from "../components/SpotifyWidget";
import "./songDetails.css"

const useStyles = makeStyles(theme => ({
  MusicControls: {
    // 'background': `linear-gradient(#212121 50%, #121212 90%)`,
    'color': 'white',
    'text-align': 'center',
    height: '100vh',
  },
  song: {
    'font-size': 20
  },
  songInfo: {
    color: '#b3b3b3',
    paddingBottom: '8%',
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
  const bigScreen = useMediaQuery({ minWidth: 1100 });
  const medScreen = useMediaQuery({ minWidth: 700, maxWidth: 1099});
  const smallScreen = useMediaQuery({ maxWidth: 699});


  let allAlbums = [
    <ReactCardFlip isFlipped={props.isFlipped} key='1'>
      <img className={classes.currentAlbum} src={props.currentAlbumCover} alt='' key='2' onClick={props.flipCard}/>
      <SpotifyWidget artistAlbum={props.artistAlbum}  flipCard={props.flipCard}/>
    </ReactCardFlip>
  ]

  let albumsMed = [
    <ReactCardFlip isFlipped={props.isFlipped} key='3'>
      <img className={classes.currentAlbum} src={props.currentAlbumCover} alt='' key='4' onClick={props.flipCard}/>
      <SpotifyWidget artistAlbum={props.artistAlbum}  flipCard={props.flipCard}/>
    </ReactCardFlip>
]

  let albumsSmall = [
    <ReactCardFlip isFlipped={props.isFlipped} key='5'>
      <img className={classes.currentAlbum} src={props.currentAlbumCover} alt='' key='6' onClick={props.flipCard}/>
      <SpotifyWidget artistAlbum={props.artistAlbum}  flipCard={props.flipCard}/>
    </ReactCardFlip>
]

  if (props.prevAlbumCover[0]) {
    allAlbums.unshift(<img className={classes.prevAlbum} src={props.prevAlbumCover[0]} alt='' key='7'/>)
    allAlbums.push(<img className={classes.nextAlbum} src={props.nextAlbumCover[0]} alt='' key='8'/>)
    albumsMed.unshift(<img className={classes.prevAlbum} src={props.prevAlbumCover[0]} alt='' key='9'/>)
    albumsMed.push(<img className={classes.nextAlbum} src={props.nextAlbumCover[0]} alt='' key='10'/>)
  }

  if (props.prevAlbumCover[1]) {
    allAlbums.unshift(<img className={classes.prevAlbum2} src={props.prevAlbumCover[1]} alt='' key='11'/>)
    allAlbums.push(<img className={classes.nextAlbum2} src={props.nextAlbumCover[1]} alt='' key='12'/>)
  }

  if (!props.nextAlbumCover[1]) {
    allAlbums.splice(0,1)
    allAlbums.pop();
  }

  return (
    <div className={classes.MusicControls} onClick={props.flipCard}>
      {bigScreen &&
        <div>
          {allAlbums}
        </div>
        }

      {medScreen &&
        <div>
          {albumsMed}
        </div>
        }

      {smallScreen &&
        <div>
          {albumsSmall}
        </div>
        }

      <p className={classes.song}>{props.trackName} </p>
      <p className={classes.songInfo}>{props.artistName && props.artistName.join(", ")}</p>
    </div>
  );
}