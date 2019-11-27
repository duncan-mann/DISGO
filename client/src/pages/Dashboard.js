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

const useStyles = makeStyles(theme => ({
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
    repeatPlayback } = useDashboardData();

  const nextAlbumCovers = [state.nextAlbumCover1, state.nextAlbumCover2];
  const prevAlbumCovers = [state.prevAlbumCover1, state.prevAlbumCover2];

  // extract songs and pass to FilterList component
  // const songsByGenre = state.songsByGenre;

  return (
    <div>
      <div className={classes.background}>
        <NavBar/>
        <EventDetails
          artistName={state.artistName}
          currentEvent={state.currentEvent[state.currentTrackUri]}
        />
        <FilterList
          allSongs={state.allSongs}
          songsByGenre={state.songsByGenre}
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
    </div >
  );
}