import React, { useState, useEffect } from 'react';
import axios from 'axios'


export default function Dashboard(props) {

const [state, setState] = useState({})

const getArtists = async(token, arr) => {
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
  console.log(artists)
  setState(state => ({...state, artists}))

} catch (error) {
console.error(error)
}
}

useEffect(() => {
  axios.get('/getUser')
    .then(async res => {
      setState(res.data)
      getArtists(state.token, ['Sum 41', 'Metallica', 'Red Hot Chili Peppers'])
    }).catch((e) => console.log('error:', e))
}, [state.token])

    return (
    <div className="App">
      Token: {state.token}
    </div>
    );
  }
