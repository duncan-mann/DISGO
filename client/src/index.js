import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from 'axios';

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}
// axios.defaults.baseURL = "https://disgo-lhl.herokuapp.com";

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

