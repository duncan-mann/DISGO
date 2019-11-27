import React, { useState, useEffect } from 'react'
import EventDetailItems from './EventDetailItems'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  event: {
    'padding-top': '5%',
    color: 'white',
    'text-align': 'center',
    'display': 'flex',
    'flex-direction': 'column'
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
  // const [events, setEvents] = useState([])

  // useEffect(() => {
  //   if (props.currentEvent) {
  //     setEvents(props.currentEvent)
  //   }
  // }, [props.currentEvent])

  const list = props.currentEvent.map((e, index) => {
    return (
      <EventDetailItems
        key={index}
        venue={e.venue.name}
        address={e.venue.address}
        date={e.datetime_local.split("T")[0]}
        avgTicketPrice={e.stats.average_price}
        url={e.url}
      />
    )
  }
  )

  return (
    <div className={classes.event}>
      <h1 className={classes.artist}>{props.artistName && props.artistName.join(", ")}</h1>
      <div className={classes.details}>
        {list}
      </div>
    </div>

  )
}
