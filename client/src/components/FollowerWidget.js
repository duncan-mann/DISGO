import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  followerWidget: {
    marginLeft: "110px",
    marginBottom: "5px"
  }
}));

export default function FollowerWidget(props) {
  const classes = useStyles();
  const src = `https://open.spotify.com/follow/1/?uri=${props.currentArtistId}&size=basic&theme=dark&show-count=0`
  return (
    <div className={classes.followerWidget}>
      <iframe
        src={src}
        width="200"
        height="25"
        scrolling="no"
        frameBorder="0"
        align="center"
        allowtransparency="true"
      />
    </div>
  )
}
