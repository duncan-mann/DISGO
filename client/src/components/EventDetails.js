import React from 'react'
import EventDetailItems from './EventDetailItems'

export default function EventDetails(props) {
  const event = props.event.map((event, index)=> {
    return (
      <EventDetailItems 
        key={index}
        // artist={state.artistName}
        venue={event.venue.name}
        address={event.venue.address}
        date={event.datetime_local.split("T")[0]}
        avgTicketPrice={event.stats.average_price}
        url={event.url}
      />
    )}
  )

  return (
    <ul>
      {event}
    </ul>
    
  )
}
