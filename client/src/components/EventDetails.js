import React, { useState, useEffect } from 'react'
import EventDetailItems from './EventDetailItems'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  event: {
  'margin-top': '5%',
    textAlign: 'center',
    color: 'white',
  },
  artist: {
  color: 'white',
  width: '70%',
  'border-bottom': '1px solid white'
}
}))

export default function EventDetails(props) {
  const classes = useStyles();
  const [events, setEvents] = useState([])

  useEffect(() => {
    if(props.currentEvent) {
      setEvents(props.currentEvent)
    }
  },[props.currentEvent])

  const list = events.map((e, index)=> {
    return (
      <EventDetailItems 
        key={index}
        venue={e.venue.name}
        address={e.venue.address}
        date={e.datetime_local.split("T")[0]}
        avgTicketPrice={e.stats.average_price}
        url={e.url}
      />
    )}
  )

  return (
    <div className={classes.event}>
      {/* <h1 className={classes.artist}>{props.artistName}</h1> */}
      <ul>
        {list}
      </ul>
    </div>

  )
}
