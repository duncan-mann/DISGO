import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ToysIcon from "@material-ui/icons/Toys";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import Slider from "@material-ui/core/Slider";
import Slide from '@material-ui/core/Slide';
import { makeStyles } from "@material-ui/core/styles";

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

const useStyles = makeStyles(theme => ({
  root: {},
  musicControlBar: {
    top: "auto",
    bottom: 0,
    // height: "10%",
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
    width: 400,
  },
  barRight: {
    float: "right",
    width: 200,
  },
  toysIcon: {
    left: 0,
    right: 0,
    animationName: "$icon-spin",
    animationDuration: "2s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite"
  },
  musicIcon: {
    "&:hover": {
      color: theme.palette.secondary.light
    }
  },
  mediaButtons: {
    width: 200,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  volumeSlider: {
    color: "white"
    // width: 100,
  },
  positionSliderTime: {
    fontSize: 10,
    color: theme.palette.primary.light,
    width: 25,
    paddingRight: 10,
    paddingLeft: 10,
    // display: 'block',
  },
  positionSlider: {
    width: 320,
    color: theme.palette.primary.light,
    paddingTop: 10,
    paddingBottom: 10,
  },
  "@keyframes icon-spin": {
    from: {
      transform: "rotate(360deg)"
    },
    to: {
      transform: "rotate(0deg)"
    }
  }
}));
export default function MusicControlBar(props) {
  const classes = useStyles();
  const [volume, setVolume] = useState(0);
  const [position, setPosition] = useState(0);
  // setInterval(setPosition(position + 1000), 1000);

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
      setPosition((props.position / props.duration) * 100);
    }
  }, [props.duration]);
  // start position timer when the position is set

  const handlePosition = (event, newPosition) => {
    // newPosition is the new position as percentage
    setPosition(newPosition);
    props.setPosition(((newPosition / 100) * props.duration) / 1000);
  };
  const convertTime = time => {
    // receive duration in milliseconds
    const seconds = ((time % (60 * 1000)) / 1000);
    const minutes = (time - (seconds * 1000)) / (60 * 1000);
    // format seconds
    let seconds_format = null;
    if (seconds.toFixed(0).toString().length === 1) {
      seconds_format = `0${seconds.toFixed(0)}`;
    } else {
      seconds_format = `${seconds.toFixed(0)}`;
    }

    return `${minutes === 0 ? 0 : minutes}:${seconds_format}`;
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.musicControlBar} position="fixed">
        <Toolbar>
          <div className={classes.barLeft}>
            <ToysIcon className={classes.toysIcon} />
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
              <Grid item >
                <span className={classes.positionSliderTime}>
                  {position === 0 ? (
                    '0:00'
                  ) : (
                    convertTime(props.position)
                  )}
                </span>
                <Slider
                  className={classes.positionSlider}
                  value={position}
                  onChange={handlePosition}
                />
                <span className={classes.positionSliderTime}>
                  {!props.duration ? (
                    '0:00'
                  ) : (
                    convertTime(props.duration)
                  )}
                </span>
              </Grid>
            </Grid>
          </div>
          <div className={classes.barRight}>
            <Grid container spacing={2}>
              <Grid item>
                <PlaylistAddIcon

                  className={classes.musicIcon}
                  onClick={() => {
                    props.addUserPlaylist()
                    props.handleClick(TransitionLeft)
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