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
  },
  loading : {
    width: "400px",
    height: "160px",
    padding: "20px",
    textAlign: "center",
    margin: "auto",
}}));

export default function EventDetails(props) {
  const classes = useStyles();
  console.log('props.currentEvent ->', props.currentEvent);


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
  console.log('LIST', list)

  return (
    <div className={classes.root}>
    {/* <h1 className={classes.artist}>{props.artistName && props.artistName.join(", ")}</h1> */}

    { props.currentEvent.length > 0 ? (
      <Carousel className={classes.carousel}
        width={"31%"}
        showThumbs={false}
        showStatus={false} 
        showIndicators={false}
      >
        {list}
      </Carousel>
      ) : (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      )
    }
    </div>
  );
}