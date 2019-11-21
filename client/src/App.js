import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/dashboard' component={Dashboard}/>
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
}

export default App;
