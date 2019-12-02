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
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // color: 'white',
  },
  navBar: {
    height: "8%"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
    // 'margin-right': 90
  },
  form: {
    // color: "white"
  },
  avatar: {
    width: 5,
    height: 5
  },
  submitButton: {
    "margin-left": "20px",
    height: "30px",
    width: "100px",
    color: "#b3b3b3",
    border: "1px solid #b3b3b3",
    backgroundColor: "rgba(0,0,0,0)",
    padding: "0",
    textAlign: "center",
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
    }
  },
  textField: {
    width: 150,
  },
  locationIcon: {
    color: 'grey',
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  input: {
    color: 'grey',
    "&:focus": {
      color: theme.palette.secondary.main,
    }
  }
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.navBar} position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Discover
          </Typography>
          <Grid container spacing={2} direction="row" alignItems="center" justify="center">
            <Grid item>
              <Grid container spacing={1} alignItems='flex-end'>
                <Grid item>
                  <TextField
                    className={classes.textField}
                    onChange={event => props.setLocation(event.target.value)}
                    // label='City'
                    value={props.location}
                    color='secondary'
                    InputProps={{
                      classes: {input: classes.input},
                      endAdornment: (
                        <InputAdornment position="end">
                          <PersonPinCircleIcon className={classes.locationIcon}/>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <DateSetter
                startDate={props.startDate}
                setStartDate={props.setStartDate}
                endDate={props.endDate}
                setEndDate={props.setEndDate}
              />
            </Grid>
            <Grid item>
              <Button
                className={classes.submitButton}
                variant="contained"
                color="secondary"
                onClick={() => props.setTimeFrame(props.startDate, props.endDate, props.location)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <IconButton edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
          {props.profilePicture && props.profilePicture.length > 0 ? (
            <Avatar
              alt="profile-picture"
              src={props.profilePicture[0]}
              className={classes.Avatar}
            />
          ) : (
            <AccountCircle />
          )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
