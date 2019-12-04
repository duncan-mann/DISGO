import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import backgroundVideo from "../../public/docs/video3.mp4";
import Grid from "@material-ui/core/Grid";
import logo from "../../public/docs/Logo-cropped.png";
import "../index.css";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  logoImg: {
    height: "20vh",
    marginTop: "17vh",
    zIndex: 2
  },
  title: {
    color: "white",
    fontFamily: "Bebas Neue",
    fontSize: "20vh",
    letterSpacing: "0.1em",
    zIndex: 1,
    // textAlign: "center",
    textIndent: "0.2em",
    marginLeft: '8vh',
    marginRight: '8vh',
  },
  subtitle: {
    color: "white",
    fontFamily: "Bebas Neue",
    fontSize: "3vh",
    fontStyle: "italic",
    letterSpacing: "0.2em",
    paddingTop: '20vh',
    zIndex: 1
  },
  loginButton: {
    fontSize: "3vh",
    width: "20vw",
    borderRadius: 25,
    marginBottom: "7vh",
    zIndex: 1,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  backgroundVideo: {
    height: "100%",
    width: "100%",
    opacity: 0.3,
    position: "relative",
    zIndex: -1
  }
}));

export default function Login(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <video loop autoPlay className={classes.backgroundVideo}>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={classes.overlay}>
        <Grid container spacing={0} direction="row" alignItems="center" justify="center">
          <Grid item>
            <Typography className={classes.subtitle}>Discover new artists</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={0} direction="column" alignItems="center">
              <Grid item><img src={logo} className={classes.logoImg} alt=""></img></Grid>
              <Grid item><Typography className={classes.title}>DISGO</Typography></Grid>
              <Grid item>
                <Button
                  className={classes.loginButton}
                  color="secondary"
                  variant="contained"
                  aria-label="login"
                  href={`${process.env.REACT_APP_API_BASE_URL}/auth/spotify`}
                >
                  Enter
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item><Typography className={classes.subtitle}>Never miss another show</Typography></Grid>
        </Grid>
      </div>
    </div>
  );
}