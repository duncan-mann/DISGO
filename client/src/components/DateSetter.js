import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles(theme => ({
  root: {
  },
  startDate: {
    width: 200,
    // color: 'red !important',
  },
  endDate: {
    width: 200,
  },
  input: {
    color: 'grey',
    "&:focus": {
      color: theme.palette.secondary.main,
    },
  },
  icon: {
    color: 'grey',
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  }
}));

export default function DateSetter(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} direction="row" alignItems="center" justify="center">
        <Grid item>
          <KeyboardDatePicker
            className={classes.startDate}
            onChange={props.setStartDate}
            value={props.startDate}
            variant='inline'
            color='secondary'
            disableToolbar
            animateYearScrolling={true}
            disablePast={true}
            InputProps={{ classes: { input: classes.input } }}
            keyboardIcon={<EventIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item>
          <KeyboardDatePicker
            className={classes.endDate}
            onChange={props.setEndDate}
            value={props.endDate}
            variant='inline'
            color='secondary'
            disableToolbar
            animateYearScrolling={true}
            disablePast={true}
            InputProps={{ classes: { input: classes.input } }}
            keyboardIcon={<EventIcon className={classes.icon} />}
          />
        </Grid>
      </Grid>
    </div>
  );
}
