import React, { useState, useEffect } from 'react';
import './SongListItem.scss';

export default function SongListItem(props) {
  // initialize state for SongListItem
  const [state, setState] = useState({ 
    deviceId: null,
    position: 0,
    duration: 0,
    trackName: 'Track Name',
    albumName: 'Artist Name',
    artistName: 'Album Name',
    playing: false
  });
  // for some reason i need to have this separate to have the music controls work
  const [currentPlayer, setPlayer] = useState(null);

  //////////////////////////////////////////////
  ////////// SPOTIFY WEB PLAYBACK SDK //////////
  //////////////////////////////////////////////
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
    const _token = props.token;
    const player = new Spotify.Player({
      name: "Jim's Web Playback SDK Player",
      getOAuthToken: callback => {
        callback(_token);
      }
    });
    // add player object to state
    console.log(player);
    setPlayer(player);
    // setState(prev => ({
    //   ...prev,
    //   currentPlayer: player
    // }));
    // error handling
    player.addListener('initialization_error', ({ msg }) => console.error(msg));
    player.addListener('authentication_error', ({ msg }) => console.error(msg));
    player.addListener('account_error', ({ msg }) => console.error(msg));
    player.addListener('playback_error', ({ msg }) => console.error(msg));
    // playback status updates
    player.addListener('player_state_changed', state => {
      console.log(state);

      const { current_track, position, duration } = state.track_window;
      const trackName = current_track.name;
      const albumName = current_track.album.name;
      const artistName = current_track.artists
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
    });
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
      setState(prev => ({
        ...prev,
        deviceId: null
      }));
    });
    // Connect to the player!
    player.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!');
      }
    });
  };

  // Play specific songs on app (device) by default
  useEffect(() => {
    
    if (props.token && state.deviceId) {
      fetch(`https://api.spotify.com/v1/me/player/play/?device_id=${state.deviceId}`, {
         method: "PUT",
         headers: {
           authorization: `Bearer ${props.token}`,
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           uris: [
             "spotify:track:7a9UUo3zfID7Ik2fTQjRLi",
             "spotify:track:0TwBtDAWpkpM3srywFVOV5",
             "spotify:track:2b8fOow8UzyDFAE27YhOZM"
           ]
         })
       });
    }
  }, [state.deviceId]);
  // music player control functions
  const handlePrev = () => {currentPlayer.previousTrack()};
  const handleNext = () => {currentPlayer.nextTrack()};
  const handleToggle = () => {currentPlayer.togglePlay()};

  return (
    <div className='SongListItem'>
      <h1>Music Player Controls</h1>
      <p>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleToggle}>{state.playing ? 'Pause' : 'Play'}</button>
        <button onClick={handleNext}>Next</button>
      </p>
      
    </div>
  );
}