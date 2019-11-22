import React, { useEffect, useState } from 'react';
import './SongListItem.scss';

export default function SongListItem(props) {
  
  // initialize state: Spotify Playback SDK (incorporate into master state later)
  const [playing, setPlaying] = useState(false);
  const [token, setToken] = useState(
    'XXX'
  );
  const [deviceId, setDeviceId] = useState(null);
  const [currentPlayer, setPlayer] = useState(null);

  // On Mount, load Spotify Web Playback SDK script
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.head.appendChild(script);
  }, []);
  // initialize Spotify Web Playback SDK
  window.onSpotifyWebPlaybackSDKReady = () => {
    console.log('script loaded');

    const Spotify = window.Spotify;
    const _token = token;
    const player = new Spotify.Player({
      name: 'JK Web Playback SDK Player',
      getOAuthToken: callback => {
        callback(_token);
      }
    });
    // add player object to state
    console.log(player);
    setPlayer(player);
    // error handling
    player.addListener('initialization_error', ({ msg }) => {
      console.error(msg);
    });
    player.addListener('authentication_error', ({ msg }) => {
      console.error(msg);
    });
    player.addListener('account_error', ({ msg }) => {
      console.error(msg);
    });
    player.addListener('playback_error', ({ msg }) => {
      console.error(msg);
    });

  }

  return (
    <div className='SongListItem'>
      Hello World!
      
    </div>
  );
}