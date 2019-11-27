
import axios from 'axios'

export const getArtists = async (token, events) => {
  try {

    let queryStrings = []

    for (let artist in events) {
      let split = artist.split(' ')
      queryStrings.push(split.join('%20'))
    }

    let artists = {}

    for (let each of queryStrings) {
      let res = await axios(`https://api.spotify.com/v1/search?q=${each}&type=artist`, {
        type: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      let split = each.split('%20')
      artists[split.join(' ')] = res.data.artists.items[0]
    }
    return artists;

  } catch (error) {
    console.error(error)
  }
}

export const getSongs = async (token, artists) => {

  try {

    const artistSong = {}
    const songs = []
    const all_genres = {}
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
        }

        let artists_genres = artists[artist].genres.join()

        for (let genre in songs_by_genre) {
          if (artists_genres.includes(genre)) {
            songs_by_genre[genre].push(res.data.tracks[0].uri)
          }
        }

        for (let genre of artists[artist].genres) {
          if (!all_genres[genre]) {
            all_genres[genre] = [res.data.tracks[0].uri]
          } else {
            all_genres[genre].push(res.data.tracks[0].uri)
          }
        }
      }

    }
    return { allSongs: songs, songsByGenre: songs_by_genre, artistSong }

  } catch (error) {
    console.error(error)
  }

}




