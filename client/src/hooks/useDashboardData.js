import { useState, useEffect } from "react";
import axios from "axios";
import { getArtists, getSongs } from "../helpers/spotifyHelper";
import { getPerformers } from "../helpers/seatGeekHelper";

export default function useDashboardData() {

  let today = new Date()
  let future = new Date()
  future.setDate(today.getDate()+29)
  future = future.toJSON().split('T')[0]
  today = today.toJSON().split('T')[0]


  const [state, setState] = useState({
    user: {},
    token: null,
    artists: {},
    events: {},
    artistEvent: {},
    artistSong: {},
    songEvent: {},
    allSongs: [],
    songsByGenre: {},
    currentEvent: {},
    currentTrackUri: "",
    // filtering
    currentGenre: [],
    currentPlaylist: [],
    // Spotfiy Playback SDK
    deviceId: null,
    position: 0,
    duration: 0,
    trackName: "",
    albumName: "",
    artistName: "",
    currentAlbumCover: null,
    prevAlbumCover1: null,
    prevAlbumCover2: null,
    nextAlbumCover1: null,
    nextAlbumCover2: null,
    playing: false,
    nextTrackUri: [],
    previousTrackUri: [],
    startDate: today,
    endDate: future,
    location: "Toronto",
    fetch: 0
  });

  const [currentPlayer, setPlayer] = useState(null);

  function setStartDate(date) {
    // console.log('Setting start date to:', date);
    setState(prev => ({...prev, startDate: date}));
}

  function setEndDate(date) {
    // console.log('Setting end date to:', date);
    setState(prev => ({...prev, endDate: date}));
}

  function setLocation(loc) {
    setState(prev => ({...prev, location: loc}))
  }

  function setTimeFrame(startDate, endDate, location) {
    setState(prev => ({ ...prev, fetch: 1 }))
    getPerformers(startDate.toJSON().split('T')[0], endDate.toJSON().split('T')[0], location)
    .then(events => {
      setState(prev => ({ ...prev, events }));
  })
}


  // obtain access token using Spotify authentication process
  useEffect(() => {
    axios
      .get("/getUser")
      .then(async res => {
        setState(state => ({ ...state, ...res.data }));
      })
      .catch(e => console.log("error:", e));
  }, []);
  // SeatGeek API call to fetch performers coming to a city in a specified time window
  useEffect(() => {
    if (state.token) {
      getPerformers(state.startDate, state.endDate, state.location)
        .then(events => {
        setState(prev => ({ ...prev, events }));
      });
    }
  }, [state.token]);
  // Spotify API call to fetch artist details
  useEffect(() => {
    if (state.token && state.events && state.events !== {}) {
      getArtists(state.token, state.events).then(artists => {
        setState(prev => ({ ...prev, artists }));
      });
    }
  }, [state.token, state.events]);

  // fetch artist id with event ids
  useEffect(() => {
    if (state.artists && state.artists !== {}) {
      const artistEvent = {};
      Object.keys(state.artists).forEach(artist => {
        if (state.artists[artist]) {
          artistEvent[state.artists[artist].id] = state.events[artist];
        }
      });
      setState(prev => ({ ...prev, artistEvent }));
    }
  }, [state.artists]);

  // fetch artist id and song url
  useEffect(() => {
    if (state.token) {
      getSongs(state.token, state.artists).then(res => {
        const { allSongs, songsByGenre, artistSong } = res;

        setState(prev => ({
          ...prev,
          allSongs,
          songsByGenre,
          artistSong,
        }));

      });
    }
  }, [state.artists]);

  // fetch song id and event id
  useEffect(() => {
    const songEvent = {};
    if (state.artistEvent !== {} && state.artistSong !== {}) {
      for (let artistId in state.artistSong) {
        if (state.artistSong[artistId] && state.artistEvent[artistId]) {
          const uri = state.artistSong[artistId];
          songEvent[uri] = state.artistEvent[artistId];
        }
      }
      setState(prev => ({ ...prev, songEvent }));
    }
  }, [state.artistEvent, state.artistSong]);

  // On Mount, load Spotify Web Playback SDK script
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.head.appendChild(script);
  }, []);
  // initialize Spotify Web Playback SDK
  useEffect(() => {
    // initialize Spotify Web Playback SDK
    window.onSpotifyWebPlaybackSDKReady = () => {
      // console.log('script loaded');

      const Spotify = window.Spotify;
      const _token = state.token;
      const player = new Spotify.Player({
        name: "Discover Web Playback SDK Player",
        getOAuthToken: callback => {
          callback(_token);
        },
        volume: 0.05
      });
      // add player object to state
      // console.log(player);
      setPlayer(player);

      player.addListener("initialization_error", ({ msg }) =>
        console.error(msg)
      );
      player.addListener("authentication_error", ({ msg }) =>
        console.error(msg)
      );
      player.addListener("account_error", ({ msg }) => console.error(msg));
      player.addListener("playback_error", ({ msg }) => console.error(msg));

      // playback status updates
      player.addListener("player_state_changed", playerState => {
        // console.log("This is the player state", playerState);
        // extract information from current track
        const {
          current_track,
          next_tracks,
          previous_tracks,
        } = playerState.track_window;
        const trackName = current_track.name;
        const albumName = current_track.album.name;
        const artistName = current_track.artists.map(artist => artist.name);

        const currentAlbumCover = current_track.album.images[0].url;
        const playing = !playerState.paused;
        // extract information from previous, next tracks
        if (previous_tracks && previous_tracks.length  === 1) {
          const prevAlbumCover1 = previous_tracks[0].album.images[0].url;
          const prevAlbumCover2 = null
          setState(prev => ({
            ...prev,
            prevAlbumCover1,
            prevAlbumCover2
          }));
        } else if (previous_tracks.length  > 1) {
          const prevAlbumCover1 = previous_tracks[1].album.images[0].url;
          const prevAlbumCover2 = previous_tracks[0].album.images[0].url;
          setState(prev => ({
            ...prev,
            prevAlbumCover1,
            prevAlbumCover2
          }));
        } else {
          const prevAlbumCover1 = null
          const prevAlbumCover2 = null
          setState(prev => ({
            ...prev,
            prevAlbumCover1,
            prevAlbumCover2
          }));
        }

        if (next_tracks && next_tracks.length > 0) {
          const nextAlbumCover1 = next_tracks[0].album.images[0].url;
          const nextAlbumCover2 = next_tracks[1].album.images[0].url;

          setState(prev => ({
            ...prev,
            nextAlbumCover1,
            nextAlbumCover2
          }));
        }

        setState(prev => ({
          ...prev,
          trackName,
          albumName,
          artistName,
          playing,
          currentAlbumCover
        }));

        //////////////////////////////////////////////////
        const currentTrackUri = current_track.uri;
        const nextTrackUri = [next_tracks[0].uri, next_tracks[1].uri];

        if(previous_tracks.length  === 1) {
          let previousTrackUri = [previous_tracks[0].uri];
          setState(prev => ({ ...prev, previousTrackUri }));
        } else if (previous_tracks.length > 1) {
          let previousTrackUri = [previous_tracks[0].uri,previous_tracks[1].uri];
          setState(prev => ({ ...prev, previousTrackUri }));
        } else {
          let previousTrackUri = []
          setState(prev => ({ ...prev, previousTrackUri }));
        }
        setState(prev => ({ ...prev, currentTrackUri }));
        setState(prev => ({ ...prev, nextTrackUri }));
        // console.log("previous tracks!", previousTrackUri)
        // console.log("next tracks", nextTrackUri)
      });
      // Ready
      player.addListener("ready", ({ device_id }) => {
        // console.log('Ready with Device ID', device_id);
        setState(prev => ({
          ...prev,
          deviceId: device_id
        }));
      });
      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        // console.log('Device ID has gone offline', device_id);
        setState(prev => ({
          ...prev,
          deviceId: null
        }));
      });
      // Connect to the player!
      player.connect().then(success => {
        if (success) {
          // console.log('The Web Playback SDK successfully connected to Spotify!');
        }
      });
    };
  }, [state.token]);

  // fetch song uri with current artist event details
  useEffect(() => {
    if (state.currentTrackUri) {
      if (!state.currentEvent[state.currentTrackUri]) {
        const temp = {
          ...state.currentEvent
        };
        const eventDetails = [];
        for (let event of state.songEvent[state.currentTrackUri]) {
          axios
            .get(
              `https://api.seatgeek.com/2/events/${event}?&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`
            )
            .then(res => {
              eventDetails.push(res.data);
            });
        }
        temp[state.currentTrackUri] = eventDetails;

        setState(prev => ({
          ...prev,
          currentEvent: temp,
          // fetch
        }));
      }
    }
  }, [state.currentTrackUri]);

  /// fetch event details for next 2 tracks from current track
  useEffect(() => {
    if (state.nextTrackUri) {
      for (let nextTrack of state.nextTrackUri) {
        if (!state.currentEvent[nextTrack]) {
          const temp = { ...state.currentEvent };
          const eventDetails = [];
          for (let event of state.songEvent[nextTrack]) {
            axios
              .get(
                `https://api.seatgeek.com/2/events/${event}?&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`
              )
              .then(res => {
                eventDetails.push(res.data);
              });
          }
          temp[nextTrack] = eventDetails;

          setState(prev => ({
            ...prev,
            currentEvent: temp
          }));
        }
      }
    }
  }, [state.nextTrackUri]);

  /// fetch event details for prev 2 tracks from current track
  useEffect(() => {
    if (state.previousTrackUri) {
      for (let prevTrack of state.previousTrackUri) {
        if (!state.currentEvent[prevTrack]) {
          const temp = { ...state.currentEvent };
          const eventDetails = [];
          for (let event of state.songEvent[prevTrack]) {
            axios
              .get(
                `https://api.seatgeek.com/2/events/${event}?&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`
              )
              .then(res => {
                eventDetails.push(res.data);
              });
          }
          temp[prevTrack] = eventDetails;

          setState(prev => ({
            ...prev,
            currentEvent: temp
          }));

        }
      }
    }
  }, [state.previousTrackUri]);

  const playTracks = (accessToken, deviceId, trackUris) => {
    fetch(`https://api.spotify.com/v1/me/player/play/?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uris: trackUris
      })
    }).then(() => {
      // const fetch = state.fetch > 0 ? 0 : 1;
      setState(prev => ({
        ...prev,
        fetch: 0
      }));
    })
  };
  // Play specific songs on app (device) by default
  useEffect(() => {
    if (state.token && state.deviceId && state.allSongs.length > 0 && state.currentGenre) {
      if (state.currentGenre.length === 0) {
        // start with all of the genres in the tracks list
        setState(prev => ({
          ...prev,
          currentPlaylist: state.allSongs
        }));

        console.log(`playing ${state.allSongs.length} tracks`);

        playTracks(state.token, state.deviceId, state.allSongs);

      } else {
        // play filtered tracks list
        const nonUniqueTracks = [];

        state.currentGenre.forEach(genre => {
          state.songsByGenre[genre].forEach(songUri => {
            nonUniqueTracks.push(songUri);
          })
        });

        const uniqueTracks = nonUniqueTracks.filter((item, index) => nonUniqueTracks.indexOf(item) === index);
        // add song uris of current playlist to state
        setState(prev => ({
          ...prev,
          currentPlaylist: uniqueTracks
        }));

        console.log(`playing ${uniqueTracks.length} tracks`);

        playTracks(state.token, state.deviceId, uniqueTracks);
      }
    }
  }, [state.deviceId, state.allSongs, state.currentGenre]);

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
    });
  };
  // filter by genre helper function
  const filterByGenre = genreStr => {
    const tmp = [...state.currentGenre];

    if (tmp.includes(genreStr)) {
      // if the genre has been selected before, REMOVE it
      const filteredArr = tmp.filter(genre => genre !== genreStr);

      setState(prev => ({
        ...prev,
        currentGenre: filteredArr
      }));
    } else {
      // if the genre has NOT been selected before, ADD it
      tmp.push(genreStr);

      setState(prev => ({
        ...prev,
        currentGenre: tmp
      }));
    }
  };

  // music player control functions
  const handlePrev = () => {
    currentPlayer.previousTrack();
  };
  const handleNext = () => {
    currentPlayer.nextTrack();
  };
  const handleToggle = () => {
    currentPlayer.togglePlay();
  };

  return {
    state,
    currentPlayer,
    handlePrev,
    handleNext,
    handleToggle,
    repeatPlayback,
    filterByGenre,
    setStartDate, 
    setEndDate, 
    setTimeFrame,
    setLocation
  };
}
