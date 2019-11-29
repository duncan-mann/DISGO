import React, {useState} from "react";
// import custom hooks
import useDashboardData from "../hooks/useDashboardData";
// import components
import NavBar from "../components/NavBar";
import SongDetails from "../components/SongDetails";
import EventDetails from "../components/EventDetails";
import GenreFilterList from "../components/GenreFilterList";
import MusicControlBar from "../components/MusicControlBar";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    background: `linear-gradient(#212121 50%, #121212 90%)`
  },
  loadingBar: {
    marginTop: '10px',
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    },
    height: '84vh',
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
    handleRepeat,
    handleShuffle,
    setVolume,
    setPosition,
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

  const [isFlipped, setIsFlipped] = useState(false)
  
  const flipCard = (e) => {
    e.preventDefault();
    console.log("flipped was clicked!")
    setIsFlipped(!isFlipped)
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
        addUserPlaylist={addUserPlaylist}
        profilePicture={state && state.user && state.user.photos}
      />
      <div>
        {state.fetch === 0 && !state.onMount && getCurrentEventDetails().length > 0 ? (
          <div>
            <div>
              <EventDetails
                artistName={state && state.artistName}
                currentEvent={getCurrentEventDetails()}
              />
            </div>
            <div>
              <GenreFilterList
                allSongs={state && state.allSongs}
                songsByGenre={state && state.songsByGenre}
                onChange={filterByGenre}
                value={state && state.currentGenre}
              />              
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
        <div>
        </div>
      </div>
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
        position={state && state.position}
        duration={state && state.duration}
        setPosition={setPosition}
      />
    </div>
  );
}
