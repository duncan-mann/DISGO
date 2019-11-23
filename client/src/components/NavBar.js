import React from 'react';
// import './NavBar.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#3f3a3a',
      main: '#191414',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#62ec83',
      main: '#1db954',
      dark: '#008827',
      contrastText: '#fff',
    },
  },
});

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

export default function NavBar() {
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
          <Button variant='contained' color='secondary'>Login</Button>
          <IconButton edge='end' aria-label='account of current user' aria-haspopup='true' color='inherit'>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}


