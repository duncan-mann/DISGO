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
      <p>Address: {props.address} Date: {props.date} </p>
      <p>{props.lowestPrice ? `Tickets Starting at: $${props.lowestPrice}`: "Sorry, tickets are currently sold out!"}</p>
      <a href={props.url} target="_blank">Purchase Ticket</a>
    </div>
  )
}
