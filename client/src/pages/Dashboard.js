import React, { useState } from "react";
// import custom hooks and helper functions
import useDashboardData from "../hooks/useDashboardData";
// import components
import NavBar from "../components/NavBar";
import SongDetails from "../components/SongDetails";
import EventDetails from "../components/EventDetails";
import GenreFilterList from "../components/GenreFilterList";
import MusicControlBar from "../components/MusicControlBar";
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import ErrorIcon from '@material-ui/icons/Error';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    background: `linear-gradient(#212121 50%, #121212 90%)`,
  },
  loadingBar: {
    marginTop: '10px',
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    },
    height: '90vh',
  },
  snackbar: {
    'margin-bottom': '3%',
    'margin-right': '12%',
    'padding': 'auto'
  },
  notification: {
    display: 'flex',
    alignItems: 'center',
  },
  loadingEventDetails: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchErrorSnackBar: {
    marginTop: '5%',
  },
  searchErrorIcon: {
    paddingTop: 3,
  },
  searchErrorText: {
    fontSize: 14,
  }
}));

export default function Dashboard(props) {
  const classes = useStyles();

  const {
    state,
    currentPlayer,
    handleNext,
    handlePrev,
    handleToggle,
    handleRepeat,
    handleShuffle,
    setVolume,
    seekPosition,
    setStartDate,
    setEndDate,
    setTimeFrame,
    setLocation,
    filterByGenre,
    addUserPlaylist,
    getCurrentEventDetails,
    getCurrentArtistImage,
    handleClick,
    handleClose,
    handleSearchAlertClose,
    removeSong
  } = useDashboardData();

  const nextAlbumCovers = [state.nextAlbumCover1, state.nextAlbumCover2];
  const prevAlbumCovers = [state.prevAlbumCover1, state.prevAlbumCover2];

  const [isFlipped, setIsFlipped] = useState(false);
  const playlistMessage = state.currentPlaylist.length < 100 ?
  <Grid container direction='row' alignItems='center' justify='center' spacing={2}>
    <Grid item><CheckCircleIcon className={classes.searchErrorIcon} /></Grid>
    <Grid item><Typography className={classes.searchErrorText}>Playlist Added to Spotify!</Typography></Grid>
  </Grid>
  :
  <Grid container direction='row' alignItems='center' justify='center' spacing={2}>
    <Grid item><HighlightOffIcon className={classes.searchErrorIcon} /></Grid>
    <Grid item><Typography className={classes.searchErrorText}>Song limit exceeded! 😥</Typography></Grid>
  </Grid>

  const flipCard = (e) => {
    e.preventDefault();
    // console.log("flipped was clicked!")
    setIsFlipped(!isFlipped);
  }

  return (
    <div className={classes.root}>
      <NavBar
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={state.startDate}
        endDate={state.endDate}
        setTimeFrame={setTimeFrame}
        setLocation={setLocation}
        location={state.location}
        profilePicture={state && state.user && state.user.photos}
      />
      {/* search error alert */}
      <Snackbar
        className={classes.searchErrorSnackBar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={state.searchAlertOpen}
        onClose={handleSearchAlertClose}
        TransitionComponent={state.searchAlertTransition}
        message={
          <Grid container direction='row' alignItems='center' justify='center' spacing={2}>
            <Grid item><ErrorIcon className={classes.searchErrorIcon} /></Grid>
            <Grid item><Typography className={classes.searchErrorText}>No events found! Try again 😅</Typography></Grid>
          </Grid>
        }
      />
      {state.fetch === 0 && !state.onMount ? (
        <div>
          <div>
            <EventDetails
              // artistName={state && state.artistName}
              // filtering={state && state.filtering}
              currentEvent={getCurrentEventDetails()}
              artistImage={getCurrentArtistImage()}
            />
          </div>
          <div>
            <GenreFilterList
              allSongs={state && state.allSongs}
              songsByGenre={state && state.songsByGenre}
              onChange={filterByGenre}
              value={state && state.currentGenre}
            />
          </div>
          <div>
            <SongDetails
              player={currentPlayer}
              trackName={state.trackName}
              albumName={state.albumName}
              currentAlbumCover={state.currentAlbumCover}
              prevAlbumCover={prevAlbumCovers}
              nextAlbumCover={nextAlbumCovers}
              artistName={state.artistName}
              flipCard={flipCard}
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
              artistAlbum={state.artistAlbum}
            />
          </div>
        </div>
      ) : (
          <div className={classes.loadingBar}>
            <LinearProgress variant="query" />
            <LinearProgress variant="query" color="secondary" />
          </div>
        )}
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={state.playlistNotification}
        onClose={handleClose}
        TransitionComponent={state.playlistTransition}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={playlistMessage}
      />
      <MusicControlBar
        playing={state.playing}
        repeatMode={state.repeat_mode}
        shuffleMode={state.shuffle}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleToggle={handleToggle}
        handleRepeat={handleRepeat}
        handleShuffle={handleShuffle}
        initialVolume={state && state.initialVolume}
        setVolume={setVolume}
        addUserPlaylist={addUserPlaylist}
        location={state.location}
        handleClick={handleClick}
        position={state && state.position}
        duration={state && state.duration}
        seekPosition={seekPosition}
        removeSong={removeSong}
      />
    </div>
  );
}
