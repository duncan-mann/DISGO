import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  song: {
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
        <img className={classes.prevAlbum} src={props.prevAlbumCover[1]} alt=''/>
        <img className={classes.prevAlbum} src={props.prevAlbumCover[0]} alt=''/>
        <img src={props.currentAlbumCover} alt=''/>
        <img className={classes.nextAlbum} src={props.nextAlbumCover[0]} alt=''/>
        <img className={classes.nextAlbum} src={props.nextAlbumCover[1]} alt=''/>
      </div>

      <p className={classes.song}>{props.trackName}</p>
      <p className={classes.songInfo}>{props.artistName && props.artistName.join(", ")}</p>
    </div>
  );
}