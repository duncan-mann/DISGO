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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {},
  musicControlBar: {
    top: "auto",
    bottom: 0,
    height: "8%",
    background: `linear-gradient(#212121 25%, #121212 75%)`,
    color: "white"
    // flexGrow: 1,
  },
  barLeft: {
    float: "left",
    width: 200
  },
  toysIcon: {
    left: 0,
    right: 0,
    animationName: "$icon-spin",
    animationDuration: "2s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite"
  },
  barCenter: {
    float: "none",
    // marginLeft: "39%",
    margin: "auto",
    width: "20%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  musicIcon: {
    "&:hover": {
      color: theme.palette.secondary.light
    }
  },
  barRight: {
    float: "right",
    width: 200
  },
  "@keyframes icon-spin": {
    from: {
      transform: "rotate(360deg)"
    },
    to: {
      transform: "rotate(0deg)"
    }
  },
  volumeSlider: {
    color: "white"
    // width: 100,
  },
  positionSlider: {
    color: 'white',
   }
}));
export default function MusicControlBar(props) {
  const classes = useStyles();
  const [volume, setVolume] = useState(0);
  const [position, setPosition] = useState(0);

  // set initial volume value
  useEffect(() => {
    if (props.initialVolume) {
      setVolume(props.initialVolume * 100);
    }
  }, [props.initialVolume]);

  const handleVolume = (event, newValue) => {
    setVolume(newValue);
    props.setVolume(newValue / 100);
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
  // set position of music
  useEffect(() => {
    if (props.position && props.duration) {
      setPosition((props.position / props.duration) * 100);
    }
  }, [props.position]);

  const handlePosition = (event, newValue) => {
    // setPosition(position)
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.musicControlBar} position="fixed">
        <Toolbar>
          <div className={classes.barLeft}>
            <ToysIcon className={classes.toysIcon} />
          </div>
          <div className={classes.barCenter}>
            <Slider
              className={classes.positionSlider}
              value={position}
              onChange={handlePosition}
            />
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
          </div>
          <div className={classes.barRight}>
            <Grid container spacing={2}>
              <Grid item>
                <PlaylistAddIcon
                  className={classes.musicIcon}
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
