import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  event: {
    textAlign: 'center',
    color: 'white'
  }
}))

export default function EventDetailItems(props) {
  const classes = useStyles();
  return (
    <div>
      <p>Playing at {props.venue} </p>
      <p>Address: {props.address} </p>
      <p>Date: {props.date} </p>
      <p>Average Ticket Price: {props.avgTicketPrice ? `$${props.avgTicketPrice}` : "SOLD OUT!"}</p>
      <a href={props.url}>Purchase Ticket</a>
    </div>
  )
}
