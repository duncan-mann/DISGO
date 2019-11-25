import React from 'react'
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

  const event = props.event.map((event, index)=> {
    return (
      <EventDetailItems 
        key={index}
        venue={event.venue.name}
        address={event.venue.address}
        date={event.datetime_local.split("T")[0]}
        avgTicketPrice={event.stats.average_price}
        url={event.url}
      />
    )}
  )

  return (
    <div className={classes.event}>
    <h1 className={classes.artist}>{props.artistName}</h1>
    <ul>
      {event}
    </ul>
    </div>
    
  )
}
