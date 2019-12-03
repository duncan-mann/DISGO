import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import backgroundVideo from "../../public/docs/background-video.mp4";
import backgroundVideo from "../../public/docs/video3.mp4";
import Grid from "@material-ui/core/Grid";
import logo from '../../public/docs/Logo-cropped.png';
import '../index.css'
import { withTheme } from "@material-ui/styles";


const title = {
  'color': 'white',
  'fontFamily': 'Bebas Neue',
  'fontSize': '20vh',
  'letterSpacing': '0.1em',
  'position': 'absolute',
  'top': '32vh',
  'zIndex': 1,
  'textAlign': 'center',
  'textIndent': '0.1em'
}

const useStyles = makeStyles(theme => ({
  root: {
    // background: 'black',
    // justifyContent: 'center',
    // backgroundColor: '#111',
    // marginTop: '5%',
  },
  loginButton: {
    fontSize: 18,
    width: "20vw",
    top: '58vh',
    borderRadius: 25,
    position: 'absolute',
    zIndex: 1,
    // margin: '0 auto',
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  backgroundVideo: {
    height: '100%',
    width: '100%',
    opacity: '0.1',
    position: 'relative',
    'z-index': 0
  },
  logoImg: {
    height: '20vh',
    'z-index': 2,
    position: 'absolute',
    top: '15vh',
    // margin: '0 auto',
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
        alignItems='center'
      >
        <video loop autoPlay className={classes.backgroundVideo}>
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <img src={logo} className={classes.logoImg}></img>
        <Typography style={title}>DISGO</Typography>
        <Button
          className={classes.loginButton}
          color="secondary"
          variant="contained"
          aria-label="login"
          href="http://localhost:8888/auth/spotify"
        >
          Login
        </Button>
        </Grid>
    </div>
  );
}
