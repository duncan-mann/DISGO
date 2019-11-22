
import axios from 'axios'

// array = [ 
//   {
//     artist: "Kanye West", 
//     event_id: 1
//   },
//   {
//     artist: "Drake", 
//     event_id: 2
//   },
//   {
//     artist: "Michael Jackson", 
//     event_id: 3
//   },
// ]

export const getArtists = async (token, arr) => {
    try {

      let queryStrings = arr.map( event => {
        let split = event.artist.split(' ')
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



