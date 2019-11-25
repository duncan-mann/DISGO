import { useState, useEffect } from 'react';
import axios from "axios";
import { getArtists, getSongs } from "../helpers/spotifyHelper";
import { getPerformers } from "../helpers/seatGeekHelper";

export default function useDashboardData() {

  const [state, setState] = useState({ 
    user: {},
    token: null,
    artists: {},
    events: {},
    deviceId: null,
    position: 0,
    duration: 0,
    trackName: 'Track Name',
    albumName: 'Artist Name',
    artistName: 'Album Name',
    currentAlbumCover: null,
    prevAlbumCover: null,
    nextAlbumCover: null,
    playing: false
  });

  const [currentPlayer, setPlayer] = useState(null);

  useEffect(() => {
    axios
      .get("/getUser")
      .then(async res => {
        setState(state => ({...state, ...res.data}));
      }).catch((e) => console.log('error:', e))
  }, []);

  // useEffect(() => {
  //   if (state.token) {
  //     getPerformers().then(events => {
  //       console.log("test", events);
  //       setState(prev => ({ ...prev, events }));
  //     });
  //   }
  // }, [state.token]);

  // useEffect(() => {
  //   if (state.token && state.events && state.events !== {}) {
  //     getArtists(state.token, state.events)
  //       .then(artists => {
  //         setState(prev => ({ ...prev, artists }));
  //     });
  //   }
  // }, [state.token, state.events]);


  // useEffect(() => {
  //   if (state.token) {
  //     getSongs(state.token, state.artists)
  //       .then(songs => {
  //         setState(prev => ({...prev, songs}))
  //       })
  //   }
  // }, [state.token, state.events, state.artists]);

  // On Mount, load Spotify Web Playback SDK script
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.head.appendChild(script);
  }, []);
  useEffect(() => {

   // initialize Spotify Web Playback SDK
    window.onSpotifyWebPlaybackSDKReady = () => {
    console.log('script loaded');

    const Spotify = window.Spotify;
    const _token = state.token;
    const player = new Spotify.Player({
      name: "Jim's Web Playback SDK Player",
      getOAuthToken: callback => {
        callback(_token);
      }
    });
    // add player object to state
    console.log(player);
    setPlayer(player);

    player.addListener('initialization_error', ({ msg }) => console.error(msg));
    player.addListener('authentication_error', ({ msg }) => console.error(msg));
    player.addListener('account_error', ({ msg }) => console.error(msg));
    player.addListener('playback_error', ({ msg }) => console.error(msg));

    // playback status updates
    player.addListener('player_state_changed', state => {
      console.log(state);
      // extract information from current track
      const { current_track, next_tracks, previous_tracks, position, duration } = state.track_window;
      const trackName = current_track.name;
      const albumName = current_track.album.name;
      const artistName = current_track.artists
        .map(artist => artist.name)
        .join(', ');
      const currentAlbumCover = current_track.album.images[0].url;
      const playing = !state.paused;
      // extract information from previous, next tracks
      if (previous_tracks && previous_tracks.length > 0) {
        const prevAlbumCover = previous_tracks[0].album.images[0].url;
        setState(prev => ({
          ...prev,
          prevAlbumCover
        }));
      }
      if (next_tracks && next_tracks.length > 0) {
        const nextAlbumCover = next_tracks[0].album.images[0].url;
        setState(prev => ({
          ...prev,
          nextAlbumCover
        }));
      }

      setState(prev => ({
        ...prev,
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing,
        currentAlbumCover
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
},[state.token])

  // Play specific songs on app (device) by default
  useEffect(() => {
    if (state.token && state.deviceId) {
      fetch(`https://api.spotify.com/v1/me/player/play/?device_id=${state.deviceId}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            context_uri: 'spotify:playlist:37i9dQZF1DWUvHZA1zLcjW'
            // uris: [
            //   "spotify:track:7a9UUo3zfID7Ik2fTQjRLi",
            //   "spotify:track:0TwBtDAWpkpM3srywFVOV5",
            //   "spotify:track:2b8fOow8UzyDFAE27YhOZM"
            // ]
          })
        });
      }
  }, [state.deviceId]);

  // Repeat user playback
 const repeatPlayback = (input) => {
    // 'input' can be either a track, context, or off
    // track will repeat the current track
    // context will repeat the current context
    // off will turn repeat off
    fetch(`https://api.spotify.com/v1/me/player/repeat?state=${input}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${state.token}`,
        "Content-Type": "application/json"
      }
    })
 };

  // music player control functions
  const handlePrev = () => {currentPlayer.previousTrack()};
  const handleNext = () => {currentPlayer.nextTrack()};
  const handleToggle = () => {currentPlayer.togglePlay()};

  return {state, currentPlayer, handlePrev, handleNext, handleToggle, repeatPlayback}
}

