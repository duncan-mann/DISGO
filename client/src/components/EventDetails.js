import React from "react";
import EventDetailItems from "./EventDetailItems";
import { makeStyles } from "@material-ui/core/styles";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./eventDetails.css";
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    // background: 'none',
  },
  // event: {
  //   "padding-top": "5%",
  //   color: "white",
  //   backgroundColor: "#393e46",
  //   padding: "10px",
  //   borderRadius: "5px"
  // },
  artist: {
    color: "white",
    width: "60%",
    margin: "auto",
    // borderBottom: "1px solid white",
    textAlign: "center",
    paddingTop: "3rem"
  },
  carousel: {
    display: "flex",
    justifyContent: "center",
}}));

export default function EventDetails(props) {
  const classes = useStyles();

  const list = props.currentEvent.map((e, index) => {
    return (
      <EventDetailItems
        key={index}
        artist={e.performers[0].name}
        venue={e.venue.name}
        address={e.venue.address}
        date={e.datetime_local.split("T")[0]}
        lowestPrice={e.stats.lowest_price}
        url={e.url}
        city={e.venue.city}
        title={e.title}
        artistImage={props.artistImage}
      />
    );
  });

  return (
    <div className={classes.root}>
    {/* <h1 className={classes.artist}>{props.artistName && props.artistName.join(", ")}</h1> */}
  
    { props.currentEvent.length > 0 ? (
      <Carousel className={classes.carousel}
        width={"30%"}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
      >
        {list}
      </Carousel>
      ) : (
      <CircularProgress color="secondary" />
      )   
    }
    </div>
  );
}