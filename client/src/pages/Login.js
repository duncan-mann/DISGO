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
  'fontFamily': 'Bebas Neue',
  'fontSize': '8em',
  'letterSpacing': '0.1em',
  'z-index': 1,
  'color': 'white',
  'position': 'absolute',
  // 'left': '50%',
  // 'margin-left': '-145px'
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
    width: "20%",
    borderRadius: 25,
    position: 'absolute',
    zIndex: 2,
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
    height: '200px',
    'z-index': 1,
    position: 'absolute',
    left: '50%',
    top: '10%',
    'margin-left': '-100px',
  }
}));

export default function Login(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <div>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // style={{ minHeight: "100vh" }}
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
    </div>
  );
}
