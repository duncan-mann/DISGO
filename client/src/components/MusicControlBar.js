import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ToysIcon from "@material-ui/icons/Toys";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from "@material-ui/icons/SkipNext";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
  },
  musicControlBar: {
    top: "auto",
    bottom: 0,
    height: "10%",
    background: `linear-gradient(#212121 25%, #121212 75%)`,
    color: "white",
    flexGrow: 1,
  },
  barLeft: {
    float: "left"
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
    margin: "auto",
    width: "25%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  musicIcon: {
    "&:hover": {
      color: theme.palette.secondary.light
    }
  },
  barRight: {
    float: "right"
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

  return (
    <div className={classes.root}>
      <AppBar className={classes.musicControlBar} position="fixed">
        <Toolbar>
            <div className={classes.barLeft}>
              <ToysIcon className={classes.toysIcon} />
            </div>
            <div className={classes.barCenter}>
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
              {props.repeatMode === 1 ? (
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
              <PlaylistAddIcon
                className={classes.musicIcon}
                fontSize="default"
                aria-label="export-playlist"
                color="error"
              />
              <VolumeUpIcon
                className={classes.musicIcon}
                fontSize="default"
                aria-label="volume-on"
                color="error"
              />
              <VolumeOffIcon
                className={classes.musicIcon}
                fontSize="default"
                aria-label="volume-off"
                color="error"
              />
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
