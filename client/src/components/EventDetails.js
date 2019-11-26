import React from 'react'
import EventDetailItems from './EventDetailItems'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
 event: {
  'padding-top': '5%',
   color: 'white',
   'text-align': 'center'
 },
 artist: {
  color: 'white',
  width: '60%',
  margin: '0 auto',
  display: 'inline-block',
  'border-bottom': '1px solid white'
},
details: {
  display: 'inline-block'
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
    <div className={classes.details}>
      {event}
    </div>
    </div>
    
  )
}
