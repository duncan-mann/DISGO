import React from "react";
// import custom hooks
import useDashboardData from "../hooks/useDashboardData";
// import components
import NavBar from "../components/NavBar";
import MusicControls from "../components/MusicControls";
import EventDetails from "../components/EventDetails";
import FilterList from "../components/FilterList";
import MusicControlBar from "../components/MusicControlBar";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  loadingBar: {
    marginTop: "10px",
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  background: {
    background: `linear-gradient(#212121 50%, #121212 90%)`
  },
  musicControlBar: {}
}));

export default function Dashboard(props) {
  const classes = useStyles();

  const {
    state,
    currentPlayer,
    handleNext,
    handlePrev,
    handleToggle,
    repeatPlayback,
    setStartDate,
    setEndDate,
    setTimeFrame,
    setLocation,
    filterByGenre,
    addUserPlaylist,
    getCurrentEventDetails
  } = useDashboardData();

  const nextAlbumCovers = [state.nextAlbumCover1, state.nextAlbumCover2];
  const prevAlbumCovers = [state.prevAlbumCover1, state.prevAlbumCover2];

  return (
    <div className={classes.background}>
      <NavBar
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={state.startDate}
        endDate={state.endDate}
        setTimeFrame={setTimeFrame}
        setLocation={setLocation}
        location={state.location}
        addUserPlaylist={addUserPlaylist}
      />
      <div>
        {state.fetch === 0 &&
        !state.onMount &&
        getCurrentEventDetails().length > 0 ? (
          <div>
            <div>
              <EventDetails
                artistName={state && state.artistName}
                currentEvent={getCurrentEventDetails()}
              />
            </div>
            <div>
              <FilterList
                allSongs={state && state.allSongs}
                songsByGenre={state && state.songsByGenre}
                onChange={filterByGenre}
                value={state && state.currentGenre}
              />
              <MusicControls
                player={currentPlayer}
                trackName={state.trackName}
                albumName={state.albumName}
                currentAlbumCover={state.currentAlbumCover}
                prevAlbumCover={prevAlbumCovers}
                nextAlbumCover={nextAlbumCovers}
                artistName={state.artistName}
              />
            </div>
          </div>
        ) : (
          <div className={classes.loadingBar}>
            <LinearProgress variant="query" />
            <LinearProgress variant="query" color="secondary" />
          </div>
        )}
      </div>
      <MusicControlBar
        playing={state.playing}
        repeatMode={state.repeat_mode}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleToggle={handleToggle}
        handleRepeat={repeatPlayback}
      />
    </div>
  );
}
