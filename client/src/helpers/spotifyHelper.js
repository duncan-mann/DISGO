
import axios from 'axios'


export const getArtists = async (token, events) => {
    try {

      let queryStrings = []

      for(let artist in events) {
        let split = artist.split(' ')
        queryStrings.push(split.join('%20'))
      }

      let artists = {}

      for (let each of queryStrings) {
        let res = await axios(`https://api.spotify.com/v1/search?q=${each}&type=artist`, {
          type: 'GET',
          headers: {'Authorization': 'Bearer ' + token}
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
    console.log

    let songs = []
    for (let artist in artists) {
      if (artists[artist]) {
    let res = await axios(`https://api.spotify.com/v1/artists/${artists[artist].id}/top-tracks?country=from_token`, {
      type: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    })

    if (res.data.tracks[0]) {
    songs.push(res.data.tracks[0].uri)
    }
  }
  }
  console.log('songs',songs)
  return songs

  } catch (error) {
    console.error(error)
  }

}



