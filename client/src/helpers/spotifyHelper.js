
import axios from 'axios'


export const getArtists = async (token, events) => {
    try {

      console.log('Something')
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



