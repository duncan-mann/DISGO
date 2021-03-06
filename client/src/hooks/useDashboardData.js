import React, { useState, useEffect }  from "react";
import axios from "axios";
import { getArtists, getSongs, initPlaylist, addSongsToPlaylist } from "../helpers/spotifyHelper";
import { getPerformers } from "../helpers/seatGeekHelper";
import Slide from "@material-ui/core/Slide";

const slideTransition = props => {
  return <Slide {...props} direction="down" />;
};
// pause user's playback
const pauseTracks = player => {
  player.pause(() => console.log("Paused!"));
};

export default function useDashboardData() {
  let today = new Date();
  let future = new Date();
  future.setDate(today.getDate() + 14);

  const [state, setState] = useState({
    onMount: true,
    fetch: 0,
    user: {},
    token: null,
    artists: {},
    events: {},
    artistEvent: {},
    artistSong: {},
    songEvent: {},
    currentTrackUri: "",
    currentTrackIndex: 0,
    allSongs: [],
    songsByGenre: {},
    currentEvent: {},
    currentArtistId: "",
    // filtering
    currentGenre: [],
    currentPlaylist: [],
    // Spotfiy Playback SDK
    initialVolume: 0.5,
    deviceId: null,
    repeat_mode: 0,
    shuffle: false,
    position: null,
    duration: null,
    trackName: "",
    albumName: "",
    artistName: "",
    artistAlbum: "",
    artistImage: {},
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
    // alerts / notifications
    playlistNotification: false,
    playlistTransition: undefined,
    searchAlertOpen: false,
    searchAlertTransition: Slide
  });

  const [currentPlayer, setPlayer] = useState(null);

  const handleSearchAlertOpen = Transition => {
    setState(prev => ({
      ...prev,
      searchAlertOpen: true,
      searchAlertTransition: Transition
    }));
  };
  const handleSearchAlertClose = () => {
    setState(prev => ({ ...prev, searchAlertOpen: false }));
  };

  function setStartDate(date) {
    // console.log('Setting start date to:', date);
    setState(prev => ({ ...prev, startDate: date }));
  }

  function setEndDate(date) {
    // console.log('Setting end date to:', date);
    setState(prev => ({ ...prev, endDate: date }));
  }

  function setLocation(loc) {
    setState(prev => ({ ...prev, location: loc }));
  }
  // start of fetching new playlist with new city and/or time window
  function setTimeFrame(startDate, endDate, location) {
    // pause player for old playlist
    // toggle fetch state to display loading component
    // setState(prev => ({ ...prev, fetch: 1 }));
    // fetch event details for new city and/or time window
    getPerformers(startDate.toJSON().split("T")[0], endDate.toJSON().split("T")[0], location)
    .then(events => {
      // check if there are events returned with the search parameters
      if (Object.entries(events).length === 0) {
        handleSearchAlertOpen(slideTransition);
      } else {
        pauseTracks(currentPlayer);
        setState(prev => ({ ...prev, events, fetch: 1 }));
      }
    });
  }

  function addUserPlaylist() {
    if (state.currentPlaylist.length <= 100) {
      initPlaylist(state.token, state.user, state.location, state.currentGenre).then(
        response => {
          addSongsToPlaylist(
            state.token,
            response.data.id,
            state.currentPlaylist
          );
        }
      );
    }
  }

  const handleClick = Transition => {
    setState(prev => ({ ...prev, playlistTransition: Transition }));
    setState(prev => ({ ...prev, playlistNotification: true }));
  };

  const handleClose = () => {
    setState(prev => ({ ...prev, playlistNotification: false }));
  };

  // obtain access token using Spotify authentication process
  useEffect(() => {
    axios.get("/getUser")
    .then(async res => {
      setState(state => ({ ...state, ...res.data }));
    })
    .catch(err => console.log("error:", err));
  }, []);
  // SeatGeek API call to fetch performers coming to a city in a specified time window
  useEffect(() => {
    if (state.token) {
      getPerformers(state.startDate.toJSON().split("T")[0], state.endDate.toJSON().split("T")[0], state.location).then(events => {
        setState(prev => ({ ...prev, events }));
      });
    }
  }, [state.token]);

  // Spotify API call to fetch artist details
  useEffect(() => {
    if (state.events && state.events !== {}) {
      getArtists(state.token, state.events)
      .then(artists => {
        setState(prev => ({ ...prev, artists }));
      });
    }
  }, [state.events]);

  // fetch artist id with event ids
  useEffect(() => {
    if (state.artists !== {}) {
      const artistEvent = {};
      const artistImage = {};
      Object.keys(state.artists).forEach(artist => {
        if (state.artists[artist]) {
          artistEvent[state.artists[artist].id] = state.events[artist];
          artistImage[state.artists[artist].id] =
            state.artists[artist].images[0];
        }
      });
      setState(prev => ({ ...prev, artistEvent, artistImage }));
    }
  }, [state.artists]);

  // fetch artist id and song url
  useEffect(() => {
    if (state.artists !== {}) {
      getSongs(state.token, state.artists)
      .then(res => {
        const { allSongs, songsByGenre, artistSong } = res;

        setState(prev => ({
          ...prev,
          allSongs,
          songsByGenre,
          artistSong,
          currentGenre: [],
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

  //////////////// Spotify Playback ///////////////
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
        volume: state.initialVolume
      });
      // add player object to state
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
        // console.log("player state =>", playerState);

        // extract information from current track
        const { current_track, next_tracks, previous_tracks } = playerState.track_window;
        const trackName = current_track.name;
        const albumName = current_track.album.name;
        const artistName = current_track.artists.map(artist => artist.name);
        const artistAlbum = current_track.album.uri.split(":")[2];
        const currentArtistId = current_track.artists[0].uri
        const currentAlbumCover = current_track.album.images[0].url;
        const playing = !playerState.paused;
        const repeat_mode = playerState.repeat_mode;
        const shuffle = playerState.shuffle;
        // song position and duration
        const position = playerState.position;
        const duration = playerState.duration;

        // extract information from previous, next tracks
        if (previous_tracks && previous_tracks.length === 1) {
          const prevAlbumCover1 = previous_tracks[0].album.images[0].url;
          const prevAlbumCover2 = null;
          setState(prev => ({ ...prev, prevAlbumCover1, prevAlbumCover2 }));
        } else if (previous_tracks.length > 1) {
          const prevAlbumCover1 = previous_tracks[1].album.images[0].url;
          const prevAlbumCover2 = previous_tracks[0].album.images[0].url;
          setState(prev => ({ ...prev, prevAlbumCover1, prevAlbumCover2 }));
        } else {
          const prevAlbumCover1 = null;
          const prevAlbumCover2 = null;
          setState(prev => ({ ...prev, prevAlbumCover1, prevAlbumCover2 }));
        }
        if (next_tracks && next_tracks.length === 1) {
          const nextAlbumCover1 = next_tracks[0].album.images[0].url;
          const nextAlbumCover2 = null;
          // console.log("Next.length === 1", nextAlbumCover1, nextAlbumCover2);
          setState(prev => ({ ...prev, nextAlbumCover1, nextAlbumCover2 }));
        } else if (next_tracks.length > 1) {
          const nextAlbumCover1 = next_tracks[0].album.images[0].url;
          const nextAlbumCover2 = next_tracks[1].album.images[0].url;
          // console.log("next.Length > 1", nextAlbumCover1, nextAlbumCover2);
          setState(prev => ({ ...prev, nextAlbumCover1, nextAlbumCover2 }));
        } else {
          const nextAlbumCover1 = null;
          const nextAlbumCover2 = null;
          // console.log("next.length === 0", nextAlbumCover2, nextAlbumCover1);
          setState(prev => ({ ...prev, nextAlbumCover1, nextAlbumCover2}));
        }

        setState(prev => ({
          ...prev,
          trackName,
          albumName,
          artistName,
          artistAlbum,
          playing,
          currentAlbumCover,
          currentArtistId,
          // fetch: 0,
          onMount: false,
          repeat_mode,
          shuffle,
          position,
          duration
        }));

        if (next_tracks.length === 1) {
          let nextTrackUri = [next_tracks[0].uri];
          setState(prev => ({ ...prev, nextTrackUri }));
        } else if (next_tracks.length > 1) {
          let nextTrackUri = [next_tracks[0].uri, next_tracks[1].uri];
          setState(prev => ({ ...prev, nextTrackUri }));
        } else {
          let nextTrackUri = [];
          setState(prev => ({ ...prev, nextTrackUri }));
        }

        if (previous_tracks.length === 1) {
          let previousTrackUri = [previous_tracks[0].uri];
          setState(prev => ({ ...prev, previousTrackUri }));
        } else if (previous_tracks.length > 1) {
          let previousTrackUri = [
            previous_tracks[0].uri,
            previous_tracks[1].uri
          ];
          setState(prev => ({ ...prev, previousTrackUri }));
        } else {
          let previousTrackUri = [];
          setState(prev => ({ ...prev, previousTrackUri }));
        }
        // set currentTrackUri
        if (current_track !== {}) {
          const currentTrackUri = current_track.uri;
          if (state.currentTrackUri !== currentTrackUri) {
            setState(prev => ({ ...prev, currentTrackUri }));
          }
        }
        // setState(prev => ({ ...prev, nextTrackUri }));
      });
      // Ready
      player.addListener("ready", ({ device_id }) => {
        setState(prev => ({
          ...prev,
          deviceId: device_id
        }));
      });
      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        // console.log('Device ID has gone offline', device_id);
        setState(prev => ({ ...prev, deviceId: null }));
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
        // make copy of currentEvent state
        const temp = { ...state.currentEvent };

        const eventDetails = state.songEvent[state.currentTrackUri].reduce((acc, cur) => {
          axios.get(`https://api.seatgeek.com/2/events/${cur}?&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`)
          .then(res => {
            acc.push(res.data);
            return acc;
          })
          .then(() => {
            temp[state.currentTrackUri] = eventDetails;
            setState(prev => ({ ...prev, currentEvent: temp }));
          });
          return acc;
        }, []);
      }
    }
  }, [state.currentTrackUri]);

  /// fetch event details for next 2 tracks from current track
  useEffect(() => {
    if (state.nextTrackUri) {
      for (let nextTrack of state.nextTrackUri) {
        if (!state.currentEvent[nextTrack]) {
          const temp = { ...state.currentEvent };

          const eventDetails = state.songEvent[nextTrack].reduce((acc, cur) => {
            axios.get(`https://api.seatgeek.com/2/events/${cur}?&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`)
            .then(res => {
              acc.push(res.data);
              return acc;
            });
            return acc;
          }, []);
          temp[nextTrack] = eventDetails;
          setState(prev => ({ ...prev, currentEvent: temp }));
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

          const eventDetails = state.songEvent[prevTrack].reduce((acc, cur) => {
            axios.get(`https://api.seatgeek.com/2/events/${cur}?&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`)
            .then(res => {
              acc.push(res.data);
              return acc;
            });
            return acc;
          }, []);
          temp[prevTrack] = eventDetails;
          setState(prev => ({ ...prev, currentEvent: temp }));
          // const eventDetails = [];
          // for (let event of state.songEvent[prevTrack]) {
          //   axios.get(`https://api.seatgeek.com/2/events/${event}?&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`)
          //   .then(res => {
          //     eventDetails.push(res.data);
          //   });
          // }
        }
      }
    }
  }, [state.previousTrackUri]);

  // start/resume user's playback
  const playTracks = (accessToken, deviceId, trackUris, index = 0) => {

    const trackIndex = trackUris.length === index ? index - 1 : index;

    fetch(`https://api.spotify.com/v1/me/player/play/?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uris: trackUris,
        offset: { position: trackIndex }
      })
    }).then(() => {
      setState(prev => ({ ...prev, fetch: 0 }));
    });
  };
  // Play specific songs on app (device) by default
  useEffect(() => {
    if (state.allSongs.length > 0 && state.currentGenre) {
      if (state.currentGenre.length === 0) {
        // start with all of the genres in the tracks list
        const allSongs = [...state.allSongs];
        setState(prev => ({...prev, currentPlaylist: allSongs }));
      } else {
        // play filtered tracks list
        const currentGenre = [...state.currentGenre];
        const songsByGenre = {...state.songsByGenre};
        // grab all of the song uris for genres in the currentGenre array
        const nonUniqueTracks = currentGenre.reduce((acc, cur) => {
          acc.unshift(...songsByGenre[cur]);
          return acc;
        }, []);
        // remove duplicate song uris from nonUniqueTracks array
        const uniqueTracks = nonUniqueTracks.filter((item, index) => nonUniqueTracks.indexOf(item) === index);
        // add song uris of current playlist to state
        setState(prev => ({ ...prev, currentPlaylist: uniqueTracks }));
      }
    }
  }, [state.currentGenre]);

  useEffect(() => {
    if (state.deviceId) {
      if (state.currentPlaylist.length > 0) {
        playTracks(state.token, state.deviceId, state.currentPlaylist, state.currentTrackIndex);
      } else {
        playTracks(state.token, state.deviceId, state.allSongs);
      }
    }
  }, [state.currentPlaylist]);

  // Repeat user playback
  const handleRepeat = repeat_mode => {
    let input = null;
    if (repeat_mode === 0) {
      input = "context";
    } else if (repeat_mode === 1) {
      input = "track";
    } else {
      input = "off";
    }
    fetch(`https://api.spotify.com/v1/me/player/repeat?state=${input}`, {
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

      setState(prev => ({ ...prev, currentGenre: filteredArr }));
    } else {
      // if the genre has NOT been selected before, ADD it
      tmp.push(genreStr);

      setState(prev => ({ ...prev, currentGenre: tmp }));
    }
  };
  // toggle shuffle for user's playback
  const handleShuffle = () => {
    fetch(
      `https://api.spotify.com/v1/me/player/shuffle?state=${
        state.shuffle ? false : true
      }`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json"
        }
      }
    );
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
  // set user's playback volume
  const setVolume = value => {
    currentPlayer.setVolume(value).then(() => {
      // console.log(`Volume updated to ${value * 100}%`);
    });
  };
  // set position in the song to play
  const seekPosition = value => {
    currentPlayer.seek(value).then(() => {
      console.log(`Changed to ${Math.round(value / 1000)} sec into the track`);
    });
  };
  // return current event details
  const getCurrentEventDetails = () => {
    if (state.currentEvent !== {} && state.currentTrackUri &&
      state.currentEvent[state.currentTrackUri] &&state.currentEvent[state.currentTrackUri].length > 0) {
      return state.currentEvent[state.currentTrackUri];
    }
    return [];
  };
  // return current artist image
  const getCurrentArtistImage = () => {
    if (
      state.artistSong !== {} &&
      state.artistImage !== {} &&
      state.currentTrackUri
    ) {
      let artistKey = Object.keys(state.artistSong).find(
        key => state.artistSong[key] === state.currentTrackUri
      );
      return state.artistImage[artistKey]
        ? state.artistImage[artistKey].url
        : "";
    }
    return "";
  };

  // remove keys with empty values
  const filterObjKeys = (obj) => {
    return Object.keys(obj).reduce((acc, cur) => {
      if (obj[cur].length > 0) {
        acc[cur] = obj[cur];
        return acc;
      }
      return acc;
    }, {})
  }
  //Remove song from current playlist function
  const removeSong = () => {
    if (state.currentTrackUri !== "") {
      // make a copy of currentGenre array
      const currentGenre = [...state.currentGenre];
      // make a copy of songsByGenre array
      const tmp = {...state.songsByGenre};
      // remove song from songsByGenre object
      const filteredSongsByGenre = {};
      Object.keys(tmp).forEach(key => {
        filteredSongsByGenre[key] = tmp[key].filter(song => song !== state.currentTrackUri)
      });
      const newSongsByGenre = filterObjKeys(filteredSongsByGenre);
      // remove song from currentPlaylist array
      const rmIdx = state.currentPlaylist.indexOf(state.currentTrackUri);
      const newPlaylist = [...state.currentPlaylist];
      newPlaylist.splice(rmIdx, 1);
      // remove song from allSongs array
      const rmIdxAllSongs = state.allSongs.indexOf(state.currentTrackUri);
      const newAllSongs = [...state.allSongs];
      newAllSongs.splice(rmIdxAllSongs, 1);
      // setting state time!
      setState(prev => ({
        ...prev,
        currentPlaylist: newPlaylist,
        allSongs: newAllSongs,
        currentTrackIndex: currentGenre.length > 0 ? rmIdx : rmIdxAllSongs,
        songsByGenre: { ...newSongsByGenre }
      }));
    }
  };

  return {
    state,
    currentPlayer,
    handlePrev,
    handleNext,
    handleToggle,
    handleRepeat,
    handleShuffle,
    setVolume,
    seekPosition,
    filterByGenre,
    setStartDate,
    setEndDate,
    setTimeFrame,
    setLocation,
    addUserPlaylist,
    getCurrentEventDetails,
    getCurrentArtistImage,
    handleClick,
    handleClose,
    handleSearchAlertOpen,
    handleSearchAlertClose,
    removeSong
  };
}
