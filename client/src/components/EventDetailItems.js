import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles(theme => ({
  details: {  
    padding: "6px 6px 20px 6px",
    textAlign: "center"
  },
  purchaseButton: {
    color: 'white',
    borderColor: 'white',
    borderStyle: "solid",
    fontSize: "14",
    padding: "8px",
    textAlign: "center",
    borderRadius: "5px",
    fontWeight: "bold",
    display: "inline-block",
    marginTop: "5px",
    textDecoration: "none",
    '&:hover': {
      backgroundColor: 'white',
      color: 'black'
    },
  },
  eventDetails: {
    color: "white"
  },
  address: {
    color: "white",
    textDecoration: "none",
    display: "block"
  }
}))

export default function EventDetailItems(props) {
  const classes = useStyles();

  return (
    <div className={classes.details}>
      <p className={classes.eventDetails}>Playing at {props.venue} </p>
      <a className={classes.address} href={`https://maps.google.com/maps/place?q=${props.address.split(" ").join("%")}`} target="_blank"><RoomIcon /> {props.address}</a>
      <p className={classes.eventDetails}>Date: {props.date} </p>
      <p className={classes.eventDetails}>{props.lowestPrice ? `Tickets Starting at: $${props.lowestPrice}`: "Sorry, tickets are currently sold out!"}</p>
      <a href={props.url} target="_blank" className={classes.purchaseButton}>Purchase Ticket</a>
    </div>
  )
}