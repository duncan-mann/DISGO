import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App(props) {
  
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/'>
            <Login/>
          </Route>
          <Route path='/dashboard'>
            <Dashboard/>
          </Route>/>
        </Switch>
      </div>
    )
    return (
      <Router>
        <Switch>
          <App/>
        </Switch>
      </Router>
    );
  }


