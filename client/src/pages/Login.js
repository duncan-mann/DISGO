import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import backgroundVideo from "../../public/docs/background-video.mp4";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    // justifyContent: 'center',
  },
  loginButton: {
    fontSize: 18,
    width: "30%",
    borderRadius: 25,
    // marginTop: "50px",
    position: 'absolute',
    zIndex: 999,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  backgroundVideo: {
    height: '100%',
    width: '100%',
    opacity: 0.1,
  }
}));

export default function Login(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // style={{ minHeight: "100vh" }}
      >
        <Button
          className={classes.loginButton}
          color="secondary"
          variant="contained"
          aria-label="login"
          href="http://localhost:8888/auth/spotify"
        >
          Login
        </Button>
        <video className={classes.backgroundVideo} loop autoPlay>
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      </Grid>
    </div>
  );
}
