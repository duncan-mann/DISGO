import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import EventIcon from "@material-ui/icons/Event";

const useStyles = makeStyles(theme => ({
  details: {
    padding: "22px",
    textAlign: "center",
    display: "flex",
    color: "white",
    marginRight: "10px",
    justifyContent: "flex-start"
  },
  purchaseButton: {
    color: "white",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: "thin",
    padding: "8px",
    textAlign: "center",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "13px",
    display: "inline-block",
    marginTop: "5px",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#1db954",
    }
  },
  eventDetails: {
    color: "white",
    margin: "1px 0 3.5px 0",
    paddingTop: "4px"
  },
  addressIcon: {
    color: "white",
    textDecoration: "none",
    display: "inline-block",
    "&:hover": {
      color: "#1db954"
    }
  },
  dateNumber: {
    color: "white",
    fontSize: "1.85em",
    fontWeight: "bold",
    margin: "auto"
  },
  dateMonth: {
    color: "white",
    margin: "6px 10px"
  },
  eventIcon: {
    color: "white",
    marginTop: "5px"
  },
  dateDetails: {
    // paddingLeft: "5px"
    marginRight: "5px"
  },
  addressDetails: {

    textAlign: "left",
    margin: "0 6px",
    width: "400px",
    height: "160px",
  },
  venueAddress: {
    display: "inline-block",
    margin: "auto",
    color: "white"
  },
  artistImgDiv: {
    width: "160px",
    height: "160px",
  },
  artistImg: {
    height: "8.5em",
    borderRadius: "3px"
  }
}));

export default function EventDetailItems(props) {
  const classes = useStyles();
  const date = new Date(props.date.split("-").join("/"))
    .toString()
    .split(" ")
    .splice(0, 4);
  return (
    <div className={classes.details}>
      <div className={classes.dateDetails}>
        <p className={classes.dateNumber}>{date[2]}</p>
        <p className={classes.dateMonth}>{date[0]}</p>
        <p className={classes.dateMonth}>{date[1]}</p>
        <EventIcon className={classes.eventIcon} />{" "}
      </div>
      <div className={classes.addressDetails}>
        <h3 className={classes.eventDetails}>{props.title}</h3>
        <p className={classes.venueAddress}>
          {props.address}{" "}
          <a
            className={classes.addressIcon}
            href={`https://www.google.com/maps/search/?api=1&query=${props.venue} ${props.city}`}
            target="_blank"
          >
            <RoomIcon />
          </a>
        </p>
        <p className={classes.eventDetails}>
          {" "}
          {props.venue} - {props.city}{" "}
        </p>
        <a href={props.url} target="_blank" className={classes.purchaseButton}>
          Purchase Ticket
        </a>
      </div>
      <div className={classes.artistImgDiv}>
        <img className={classes.artistImg} src={props.artistImage} alt="" />
      </div>
      {/* <p className={classes.eventDetails}>{props.lowestPrice ? `Tickets Starting at: $${props.lowestPrice}`: "Sorry, tickets are currently sold out!"}</p> */}
    </div>
  );
}
