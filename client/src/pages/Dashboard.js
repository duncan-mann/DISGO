import React, { useEffect, useState } from "react";
import './Dashboard.css';


// import custom hooks
import useDashboardData from "../hooks/useDashboardData";
// import components
import NavBar from '../components/NavBar';
import MusicControls from '../components/MusicControls';
import EventDetails from "../components/EventDetails";
import FilterList from '../components/FilterList';

export default function Dashboard(props) {

  const {
    state,
    currentPlayer,
    handleNext,
    handlePrev,
    handleToggle,
    repeatPlayback } = useDashboardData();

  return (
    <div>
      <NavBar />
      <div className="Events">
        <h2>This is the Event Details!</h2>
        <EventDetails currentEvent={state.currentEvent[state.currentTrackUri]} />
      </div>
      <FilterList
        songs={state.songs}
      />
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
        handleRepeat={repeatPlayback}
      />
    </div>
  );
}