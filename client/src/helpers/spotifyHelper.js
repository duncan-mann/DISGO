
import axios from 'axios';

export const getArtists = async (token, events) => {
  try {

    let queryStrings = [];

    for (let artist in events) {
      let split = artist.split(' ');
      queryStrings.push(split.join('%20'));
    }

    let artists = {};

    for (let each of queryStrings) {
      let res = await axios(`https://api.spotify.com/v1/search?q=${each}&type=artist&limit=1`, {
        type: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      // replace '%20' with space
      let split = each.split('%20');
      artists[split.join(' ')] = res.data.artists.items[0];
      // // using the artist name returned from Spotify does not work with the rest of the code
      // if (res.data.artists.items[0]) {
      //   console.log('seatgeek artist name =>', each);
      //   console.log('spotify artist name =>', res.data.artists.items[0].name);
      //   artists[res.data.artists.items[0].name] = res.data.artists.items[0];
      // }
    }
    return artists;

  } catch (error) {
    console.error(error);
  }
}

export const getSongs = async (token, artists) => {

  try {

    const artistSong = {}
    const songs = []

    const genreKeywords = {
      metal: ['metal', 'brutal', 'death'],
      rock: ['rock', 'americana'],
      country: ['country'],
      punk: ['punk', 'emo'],
      blues: ['blues'],
      jazz: ['jazz'],
      soul: ['soul', 'r&b'],
      folk: ['folk'],
      pop: ['pop', 'disco', 'dance'],
      electronic: ['electronic', 'electro', 'tech', 'house', 'edm', 'step', 'tropical', 'tronic', 'bigroom' ],
      indie: ['indie'],
      rap: ['rap', 'trap'],
      hiphop: ['hip', 'hop'],
      funk: ['funk', 'jam'],
      classical: ['orchestra'],
      canadian: ['canadian', 'canada', 'ontario', 'vancouver', 'toronto']
    }

    const songs_by_genre = {
      rock: [],
      country: [],
      punk: [],
      metal: [],
      blues: [],
      jazz: [],
      soul: [],
      folk: [],
      pop: [],
      electronic: [],
      indie: [],
      rap: [],
      hiphop: [],
      funk: [],
      classical: [],
      canadian: [],
      other: []
    }

    for (let artist in artists) {
      if (artists[artist]) {

        let res = await axios(`https://api.spotify.com/v1/artists/${artists[artist].id}/top-tracks?country=from_token`, {
          type: 'GET',
          headers: { 'Authorization': 'Bearer ' + token }
        })

        if (res.data.tracks[0]) {

          songs.push(res.data.tracks[0].uri)
          // fetching artist id and song uri
          artistSong[artists[artist].id] = res.data.tracks[0].uri
        

        let artists_genres = artists[artist].genres.join()
        let found = false;
        for (let genre in genreKeywords) {
          let contains = false
          for (let subgenre of genreKeywords[genre]) {
            if (artists_genres.includes(subgenre) && !songs_by_genre.metal.includes(res.data.tracks[0].uri)) {
              contains = true
            }
          }
          if (contains) {
            songs_by_genre[genre].push(res.data.tracks[0].uri)
            found = true
          }
        }
        if (!found) {
          songs_by_genre.other.push(res.data.tracks[0].uri)
        }
        // let all_genres= {}
        // for (let genre of artists[artist].genres) {
        //   if (!all_genres[genre]) {
        //     all_genres[genre] = [res.data.tracks[0].uri]
        //   } else {
        //     all_genres[genre].push(res.data.tracks[0].uri)
        //   }
        // }
        // console.log(all_genres)
      }
      }
    }
    // remove genres from songs_by_genre that do not have any songs
    const songsByGenre = Object.keys(songs_by_genre).reduce((acc, cur) => {
      if (songs_by_genre[cur].length > 0) {
        acc[cur] = songs_by_genre[cur];
      }
      return acc;
    }, {});

    return { allSongs: songs, songsByGenre, artistSong }

  } catch (error) {
    console.error(error)
  }

}

export const initPlaylist = async (token, user, playlistName) => {

  try {

  return await axios(`https://api.spotify.com/v1/users/${user.username}/playlists`, {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + token },
          data: {
            name: playlistName, 
            description: 'Testing adding a playlist to users Library',
            public: 'false'
          }
        });

  } catch (error) {
    console.log(error)
  }
}

export const addSongsToPlaylist = async (token, playlistId, songsArray) => {

  try {

    return await axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + token },
          data: {
            uris: songsArray
          }
        })

  } catch (error) {
    console.log(error)
  }
}




