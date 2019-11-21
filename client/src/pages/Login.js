import React, { Component } from 'react';


class Login extends Component {
  render() {
    return (
    <div className="App">
      <h1>Login to Spotify</h1>
      {/* Link to List.js */}
      <a href='http://localhost:8888/auth/spotify'>
            Login
        </a>
    </div>
    );
  }
}
export default Login;