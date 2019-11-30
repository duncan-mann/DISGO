import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// create theme for entire project
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/dayjs';

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
    error: {
      main: '#fff'
    }
  },
  overrides: {
    MuiInputBase: {
      input: {
        color: "#b3b3b3"
      }
    }
  }
});

export default function App(props) {

  const App = () => (
    <div>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>/>
        </Switch>
    </div>
  )
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <App />
          </Switch>
        </Router>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}


