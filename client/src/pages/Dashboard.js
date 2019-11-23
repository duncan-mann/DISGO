import React from "react"
import './Dashboard.css';

// import components
import useDashboardData from "../hooks/useDashboardData" 
import MusicControls from '../components/MusicControls';

export default function Dashboard(props) {

  const { state, currentPlayer, handleNext, handlePrev, handleToggle } = useDashboardData();

  return (
    <div className="Dashboard">
        <MusicControls
        player={currentPlayer}
        playing={state.playing}
        trackName={state.trackName}
        albumName={state.albumName}
        currentAlbumCover={state.currentAlbumCover}
        prevAlbumCover={state.prevAlbumCover}
        nextAlbumCover={state.nextAlbumCover}
        artistName={state.artistName}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleToggle={handleToggle}
      />
    </div>
  );
}






  
  
    

  