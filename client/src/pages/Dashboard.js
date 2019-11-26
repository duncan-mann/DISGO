import React from "react";
import './Dashboard.css';


// import custom hooks
import useDashboardData from "../hooks/useDashboardData";
// import components
import NavBar from '../components/NavBar';
import MusicControls from '../components/MusicControls';
import EventDetails from "../components/EventDetails";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  background : {
    'background' : `linear-gradient(#212121 50%, #121212 90%)`,
  }
}))

export default function Dashboard(props) {

  const { state, currentPlayer, handleNext, handlePrev, handleToggle, repeatPlayback } = useDashboardData();
  const classes = useStyles();
  const nextAlbumCovers = [state.nextAlbumCover1, state.nextAlbumCover2]
  const prevAlbumCovers = [state.prevAlbumCover1, state.prevAlbumCover2]
  
  return (
    <div>
      <NavBar />
      <div className={classes.background}>
        <EventDetails 
        event={state.event} 
        artistName={state.artistName}
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
    </div>
  );
}