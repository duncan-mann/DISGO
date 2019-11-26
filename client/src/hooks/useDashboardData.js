import { useState, useEffect } from 'react';
import axios from "axios";
import { getArtists, getSongs } from "../helpers/spotifyHelper";
import { getPerformers, getEventDetails } from "../helpers/seatGeekHelper";

export default function useDashboardData() {

  const [state, setState] = useState({
    user: {},
    token: null,
    artists: {},
    events: {},
    event: [],
    deviceId: null,
    position: 0,
    duration: 0,
    trackName: '',
    albumName: '',
    artistName: '',
    currentAlbumCover: null,
    prevAlbumCover: null,
    nextAlbumCover: null,
    playing: false
  });

  const [currentPlayer, setPlayer] = useState(null);

  // obtain access token using Spotify authentication process
  useEffect(() => {
    axios
      .get("/getUser")
      .then(async res => {
        setState(state => ({...state, ...res.data}));
      }).catch((e) => console.log('error:', e))
  }, []);
  // SeatGeek API call to fetch performers coming to a city in a specified time window
  useEffect(() => {
    if (state.token) {
      getPerformers()
      .then(events => {
        setState(prev => ({ ...prev, events }));
      });
    }
  }, [state.token]);
  // Spotify API call to fetch artist details
  useEffect(() => {
    if (state.token && state.events && state.events !== {}) {
      getArtists(state.token, state.events)
      .then(artists => {
        setState(prev => ({ ...prev, artists }));
      });
    }
  }, [state.token, state.events]);
  // Spotify API call to fetch song details
  useEffect(() => {
    if (state.token) {
      getSongs(state.token, state.artists)
        .then(songs => {
          setState(prev => ({...prev, songs}))
        })
    }
  }, [state.token, state.events, state.artists]);
  // SeatGeekAPI call to fetch event details for currently playing song
  useEffect(() => {
    if (state.events && state.events !== {} && state.artistName) {
      getEventDetails(state.events, state.artistName)
      .then(event => {
        setState(prev => ({...prev, event}))
      })
    }
  },[state.artistName])
  //////////////////////////
  // Spotify Playback SDK //
  //////////////////////////
  // On Mount, load Spotify Web Playback SDK script
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.head.appendChild(script);
  }, []);
  // initialize Spotify Web Playback SDK
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const Spotify = window.Spotify;
      const _token = state.token;
      const player = new Spotify.Player({
        name: "Discover App",
        getOAuthToken: callback => {
          callback(_token);
        },
        volume: 0.5
      });
      // add player object to state
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
          .map(artist => artist.name)[0];
        const currentAlbumCover = current_track.album.images[0].url;
        const playing = !state.paused;
        // extract information from previous, next tracks
        if (previous_tracks && previous_tracks.length > 0) {
          const prevAlbumCover = previous_tracks[1].album.images[0].url;
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
    if (state.token && state.deviceId && state.songs && state.songs.songs.length > 0) {
      const allSongs = state.songs.songs;

      fetch(`https://api.spotify.com/v1/me/player/play/?device_id=${state.deviceId}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            uris: allSongs
        })
        });
      }
  }, [state.deviceId , state.songs]);

  // Repeat user playback
 const repeatPlayback = () => {
    // 'input' can be either a track, context, or off
    // track will repeat the current track
    // context will repeat the current context
    // off will turn repeat off
    fetch(`https://api.spotify.com/v1/me/player/repeat?state=context`, {
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

