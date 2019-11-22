import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {getArtists} from '../helpers/seatgeek-helpers/apihelpers.js/index.js'


export default function Dashboard(props) {

  const [state, setState] = useState({user : {}, token: null, artists: {}})

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

// useEffect(() => {
//   axios.get('/getUser')
//     .then(async res => {
//       setState(res.data)
//       let artists = await getArtists(state.token, ['Sum 41', 'Metallica', 'Red Hot Chili Peppers'])

//       setState(prev => ({...prev, artists}))
//     }).catch((e) => console.log('error:', e))
// }, [state.token])

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
