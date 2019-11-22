import React, { useEffect, useState } from 'react';
import './SongListItem.scss';

export default function SongListItem(props) {
  
  // initialize state: Spotify Playback SDK (incorporate into master state later)
  const [state, setState] = useState({
    token: null,
    deviceId: null,
    currentPlayer: null,
    position: 0,
    duration: 0,
    trackName: 'Track Name',
    albumName: 'Artist Name',
    artistName: 'Album Name',
    playing: false
  });

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
    setState(prev => ({
      ...prev,
      currentPlayer: player
    }));
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
    // playback status updates
    player.addListener('player_state_changed', state => {
      console.log(state);
      // commented out as the information is not being used
      const { current_track, position, duration } = state.track_window;
      const trackName = current_track.name;
      const albumName = current_track.name;
      const artistName = current_track.album.name
        .map(artist => artist.name)
        .join(', ');
      const playing = !state.paused;
      
      setState(prev => ({
        ...prev,
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      }));
    });
    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      setState(prev => ({
        ...prev,
        deviceId: device_id
      }));
    })
  }

  return (
    <div className='SongListItem'>
      Hello World!
      
    </div>
  );
}