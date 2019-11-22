
import axios from 'axios'

export const getArtists = async (token, arr) => {
    try {

      let queryStrings = arr.map( artist => {
        let split = artist.split(' ')
        return split.join('%20')
      })

      let artists = {}
      for (let each of queryStrings) {
        let res = await axios(`https://api.spotify.com/v1/search?q=${each}&type=artist`, {
          type: 'GET',
          headers: {'Authorization': 'Bearer ' + token}
        })
        artists[each] = res.data.artists.items[0]
      }
      return artists;

    } catch (error) {
    console.error(error)
  }
}



