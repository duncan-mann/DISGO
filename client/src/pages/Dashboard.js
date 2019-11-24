import React from "react"
import './Dashboard.css';

// import components
import useDashboardData from "../hooks/useDashboardData" 
import MusicControls from '../components/MusicControls';
import EventDetails from "../components/EventDetails";
export default function Dashboard(props) {

  const { state, currentPlayer, handleNext, handlePrev, handleToggle } = useDashboardData();

  console.log(state.event)
  return (
    <div className="Dashboard">
      <div className="Events">
        {state.event.map((event, index)=> (
          <EventDetails 
          key={index}
          // artist={state.artistName}
          venue={event.venue.name}
          address={event.venue.address}
          date={event.datetime_local.split("T")[0]}
          avgTicketPrice={event.stats.average_price}
          url={event.url}
          />
        ))}

      </div>
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






  
  
    

  