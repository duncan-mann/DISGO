import React from 'react';
// import './NavBar.css';
import DateSetter from './DateSetter'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
 
  return (
    <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Discover
            </Typography>
            <DateSetter
            startDate={props.startDate}
            setStartDate={props.setStartDate}
            endDate={props.endDate}
            setEndDate={props.setEndDate}
            />
            <Button variant='contained' color='secondary' onClick={() => props.setTimeFrame(props.startDate, props.endDate)}>Set Date</Button>
            <IconButton edge='end' aria-label='account of current user' aria-haspopup='true' color='inherit'>
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
  )
}


