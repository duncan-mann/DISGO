import React, { useState, useEffect } from 'react'
import EventDetailItems from './EventDetailItems'

export default function EventDetails(props) {

  const [events, setEvents] = useState([])

  useEffect(() => {
    if(props.event) {
      setEvents(props.event)
    }
  },[props.event])

  console.log("THIS IS PROPS.EVENTS =========>", props.event)

  const event = events.map((event, index)=> {
    
    console.log("THIS IS THE EVENT PROP", event)
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
