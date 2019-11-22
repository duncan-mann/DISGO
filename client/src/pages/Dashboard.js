import React, { useState, useEffect } from 'react';
import axios from 'axios'


export default function Dashboard(props) {

  const [state, setState] = useState({})

  const getPerformers = () => {
    return axios.get(`https://api.seatgeek.com/2/events?venue.city=toronto&datetime_utc.gte=2019-11-21T00:00:00&datetime_utc.lte=2020-02-02T23:59:59&taxonomies.name=concert&per_page=400&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`)
    .then(res => {
        const allEvents = res.data.events
        const artists = [];
        const events = [];
        console.log(allEvents[0])
        ////// performers ////////
        for (let event in allEvents) { 
          let performer = allEvents[event].performers
          const eachEvent = {}
          // eachEvent[venue] = allEvents[event].venue.name
          // console.log(performer)
          for (let artist in performer) {
            artists.push(performer[artist].name)
          }
        }
        return [...new Set(artists)]
      })
    }

  const getArtists = async(token, arr) => {
    try {

    let queryStrings = arr.map(artist => {
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
      .then(res => {
        setState(res.data)
        if (state.token) {
          getPerformers().then(performers => {
            getArtists(state.token, performers)
          })
        }
      }).catch((e) => console.log('error:', e))
  }, [state.token])

  return (
    <div className="App">
      Token: {state.token}
    </div>
  );
}
