import React from "react";
import DateSetter from "./DateSetter";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from '@material-ui/core/Avatar';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    height: "8%"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    // 'margin-right': 90
  },
  form: {
    color: "white"
  },
  avatar: {
    width: 5,
    height: 5,
  },
  submitButton: {
    'margin-left': '20px',
    height: '30px',
    width: '100px',
    color: '#b3b3b3',
    border: "1px solid #b3b3b3",
    backgroundColor: 'rgba(0,0,0,0)',
    padding: "0",
    textAlign: "center",
    borderRadius: "15px",
    '&:hover': {
      backgroundColor: theme.palette.primary,
      color: 'white'
    },
  },
  textField: {
    color: '#b3b3b3'
  }
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.navBar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Discover
          </Typography>
          <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justify="center"
      >
          <TextField
            color="secondary"
            className={classes.textField}
            onChange={event => props.setLocation(event.target.value)}
            value={props.location}
          />
          <DateSetter
            startDate={props.startDate}
            setStartDate={props.setStartDate}
            endDate={props.endDate}
            setEndDate={props.setEndDate}
          />
          <Button
            className={classes.submitButton}
            variant="contained"
            color="secondary"
            onClick={() =>
              props.setTimeFrame(props.startDate, props.endDate, props.location)
            }
          >
            Submit
          </Button>
      </Grid>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            >
            {props.profilePicture && props.profilePicture[0].length > 9 ? (
              <Avatar alt="profile-picture" src={props.profilePicture[0]} className={classes.Avatar} />
              ) : (
                <AccountCircle />
                )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
