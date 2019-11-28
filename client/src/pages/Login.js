import React from 'react';
import sample from '../../public/docs/background-video.mp4';

export default function Login(props) {

    
    return (
    <div className="App">
      <h1>Login to Spotify</h1>
      {/* Link to List.js */}
      <a href='http://localhost:8888/auth/spotify'>
            Login
    </a>
    <video id="background-video" loop autoPlay>
        <source src={sample} type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    </div>
    );
}
