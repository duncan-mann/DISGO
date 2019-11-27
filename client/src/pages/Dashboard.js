import React from "react";
import './Dashboard.css';

// import custom hooks
import useDashboardData from "../hooks/useDashboardData";
// import components
import NavBar from '../components/NavBar';
import MusicControls from '../components/MusicControls';
import EventDetails from "../components/EventDetails";
import FilterList from '../components/FilterList';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  loadingBar: {
    marginTop: '500px',
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  background: {
    'background': `linear-gradient(#212121 50%, #121212 90%)`,
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
    repeatPlayback,
    setStartDate,
    setEndDate,
    setTimeFrame,
    currentEvent
    setLocation,
    filterByGenre } = useDashboardData();

  const nextAlbumCovers = [state.nextAlbumCover1, state.nextAlbumCover2];
  const prevAlbumCovers = [state.prevAlbumCover1, state.prevAlbumCover2];
  

  return (
    <div>
      <div className={classes.background}>
      <NavBar 
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={state.startDate}
        endDate={state.endDate}
        setTimeFrame={setTimeFrame}
        setLocation={setLocation}
        location={state.location} />
      {state.currentEvent !== {} && state.currentTrackUri && state.currentEvent[state.currentTrackUri] ?
        <div>
        <EventDetails
          artistName={state && state.artistName}
          currentEvent={state.currentEvent[state.currentTrackUri]}
        />  
        <FilterList
          allSongs={state && state.allSongs}
          songsByGenre={state && state.songsByGenre}
          onChange={filterByGenre}
          value={state && state.currentGenre}
        />
        <MusicControls
          player={currentPlayer}
          playing={state.playing}
          trackName={state.trackName}
          albumName={state.albumName}
          currentAlbumCover={state.currentAlbumCover}
          prevAlbumCover={prevAlbumCovers}
          nextAlbumCover={nextAlbumCovers}
          artistName={state.artistName}
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleToggle={handleToggle}
          handleRepeat={repeatPlayback}
        />
        </div>
        :
        <div className={classes.loadingBar}>
          <LinearProgress variant="query" />
          <LinearProgress variant="query" color="secondary" />
        </div>
      }
      </div>
    </div >
  );
}