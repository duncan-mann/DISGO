import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  followerWidget: {
    margin: 'auto'

  }
}));

export default function FollowerWidget() {
  const classes = useStyles();

  return (
    <div className={classes.followerWidget}>
      <iframe 
        src="https://open.spotify.com/follow/1/?uri=spotify:artist:6sFIWsNpZYqfjUpaCgueju&size=basic&theme=dark&show-count=0" 
        width="200" 
        height="25" 
        scrolling="no" 
        frameborder="0"
        align="center"
        allowtransparency="true"
      />
    </div>
  )
}
