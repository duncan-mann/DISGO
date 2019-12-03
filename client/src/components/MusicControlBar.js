import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import Slider from "@material-ui/core/Slider";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import '../index.css'

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

const playlistLength = {
  'fontFamily': 'Bebas Neue',
  'margin': 'auto 0%',
  'padding-bottom': '7px',
  'padding-right' : '5px'
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '8%',
  },
  musicControlBar: {
    top: "auto",
    bottom: 0,
    height: "10%",
    background: `linear-gradient(#212121 25%, #121212 75%)`,
    color: "white",
    paddingTop: 5,
    paddingBottom: 5,
  },
  barLeft: {
    float: "left",
    width: 200,
  },
  barCenter: {
    float: "none",
    margin: "auto",
    width: 600,
  },
  barRight: {
    float: "right",
    width: 200,
  },
  deleteSong: {
    left: 0,
    right: 0,
    "&:hover": {
      color: theme.palette.secondary.light
    }
  },
  musicIcon: {
    "&:hover": {
      color: theme.palette.secondary.light,
    }
  },
  mediaButtons: {
    width: 200,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  volumeSlider: {
    color: "white",
  },
  songController: {
    color: 'lightgrey',
    fontSize: 10,
    width: 400,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  positionSlider: {
    color: 'lightgrey',
  },
  time: {
    margin: 10,
  },
  "@keyframes icon-spin": {
    from: {
      transform: "rotate(360deg)",
    },
    to: {
      transform: "rotate(0deg)",
    }
  }
}));
export default function MusicControlBar(props) {
  const classes = useStyles();
  const [volume, setVolume] = useState(0);
  const [position, setPosition] = useState(0); // position in milliseconds
  const [timer, setTimer] = useState(0); //timer in milliseconds

  useEffect(() => {
    if (props.playing) {
      setPosition(position + 1000);
    }
    setTimeout(() => {
      setTimer(timer + 1000);
    }, 1000);
  }, [timer]);

  // useEffect(() => {
  //   console.log('position: ', position);
  // }, [position])

  /////////////////////////
  // change music volume //
  /////////////////////////
  useEffect(() => {
    if (props.initialVolume) {
      setVolume(props.initialVolume * 100);
    }
  }, [props.initialVolume]);

  const handleVolume = (event, newVolume) => {
    setVolume(newVolume);
    props.setVolume(newVolume / 100);
  };
  // mute volume
  const muteVolume = () => {
    if (volume === 0) {
      setVolume(50);
      props.setVolume(0.5);
    } else {
      setVolume(0);
      props.setVolume(0);
    }
  };
  ///////////////////////////
  // set position of music //
  ///////////////////////////
  useEffect(() => {
    if (props.duration) {
      setPosition(props.position);
    }
  }, [props.position]);
  // start position timer when the position is set

  const handleSeek = (event, percentage) => {
    // percentage is the new position as percentage
    const newPosition = percentage / 100 * props.duration;
    setPosition(newPosition);
    props.seekPosition(newPosition);
  };

  const convertTime = time => {
    // receive duration in milliseconds
    const seconds = Math.round((time % (60 * 1000)) / 1000);
    const minutes = Math.round((time - seconds * 1000) / (60 * 1000));
    // format seconds
    let seconds_format = null;
    if (seconds.toString().length === 1) {
      seconds_format = `0${seconds}`;
    } else {
      seconds_format = `${seconds}`;
    }

    return `${minutes === 0 ? 0 : minutes}:${seconds_format}`;
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.musicControlBar} position="fixed">
        <Toolbar>
          <div className={classes.barLeft}>
            <DeleteForeverIcon 
            className={classes.deleteSong} 
            onClick={() => props.removeSong()}
            />
          </div>
          <div className={classes.barCenter}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item className={classes.mediaButtons}>
                <ShuffleIcon
                  className={classes.musicIcon}
                  onClick={props.handleShuffle}
                  fontSize="default"
                  aria-label="shuffle"
                  color={props.shuffleMode ? "secondary" : "error"}
                />
                <SkipPreviousIcon
                  className={classes.musicIcon}
                  onClick={props.handlePrev}
                  fontSize="default"
                  aria-label="previous"
                  color="error"
                />
                {props.playing ? (
                  <PauseCircleOutlineIcon
                    className={classes.musicIcon}
                    onClick={props.handleToggle}
                    fontSize="large"
                    aria-label="Playing"
                    color="error"
                  />
                ) : (
                  <PlayCircleOutlineIcon
                    className={classes.musicIcon}
                    onClick={props.handleToggle}
                    fontSize="large"
                    aria-label="Paused"
                    color="error"
                  />
                )}
                <SkipNextIcon
                  className={classes.musicIcon}
                  onClick={props.handleNext}
                  fontSize="default"
                  aria-label="next"
                  color="error"
                />
                {props.repeatMode === 2 ? (
                  <RepeatOneIcon
                    className={classes.musicIcon}
                    onClick={() => props.handleRepeat(props.repeatMode)}
                    fontSize="default"
                    aria-label="repeat-one"
                    color="secondary"
                  />
                ) : (
                  <RepeatIcon
                    className={classes.musicIcon}
                    onClick={() => props.handleRepeat(props.repeatMode)}
                    fontSize="default"
                    aria-label="repeat"
                    color={props.repeatMode === 0 ? "error" : "secondary"}
                  />
                )}
              </Grid>
              <Grid item className={classes.songController}>
                <div className={classes.time}>
                  {position === 0 ? "0:00" : convertTime(position)}
                </div>
                  <Slider
                    className={classes.positionSlider}
                    value={(position / props.duration) * 100 || 0}
                    onChange={handleSeek}
                  />
                <div className={classes.time}>
                  {!props.duration ? "0:00" : convertTime(props.duration)}
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={classes.barRight}>
            <Grid container spacing={2}>
                {<p style={playlistLength}>{props.currentPlaylist.length} Tracks</p>}
              <Grid item>
                <PlaylistAddIcon
                  className={classes.musicIcon}
                  onClick={() => {
                    props.addUserPlaylist();
                    props.handleClick(TransitionLeft);
                  }}
                  fontSize="default"
                  aria-label="export-playlist"
                  color="error"
                />
              </Grid>
              <Grid item>
                {volume === 0 ? (
                  <VolumeOffIcon
                    className={classes.musicIcon}
                    onClick={() => muteVolume()}
                    fontSize="default"
                    aria-label="volume-on"
                    color="error"
                  />
                ) : (
                  <VolumeUpIcon
                    className={classes.musicIcon}
                    onClick={() => muteVolume()}
                    fontSize="default"
                    aria-label="volume-off"
                    color="error"
                  />
                )}
              </Grid>
              <Grid item xs>
                <Slider
                  className={classes.volumeSlider}
                  value={volume}
                  onChange={handleVolume}
                />
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
