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

  //  const [genres, setGenre] = useState([]);

  // wait until state.songs is set before passing down as prop
  // useEffect(() => {
  //   if (state.songs && ) {
  //     const genreArray = Object.keys(props.songs.songs_by_genre);
  //     setGenre(genreArray);
  //   }
  // }, [state.songs]);

  return (
    <div className="Dashboard">
      <NavBar />
      <div className="Events">
        <h2>This is the Event Details!</h2>
        <EventDetails event={state.event} />
      </div>
      <FilterList
        songsByGenre={state.songs && state.songs.songs_by_genre}
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