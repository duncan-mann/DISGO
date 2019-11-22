import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { getArtists } from '../helpers/spotifyHelper'
import { getPerformers } from '../helpers/seatGeekHelper'


export default function Dashboard(props) {

  const [state, setState] = useState({ user: {}, token: null, artists: {}, events: [] })



  useEffect(() => {
    axios.get('/getUser')
      .then(async res => {
        setState(res.data)
      }).catch((e) => console.log('error:', e))
  }, [])

  useEffect(() => {
    if (state.token) {
      getPerformers()
        .then((events) => {
          console.log('test', events);
          setState(prev => ({ ...prev, events }))
        })
    }
  }, [state.token])

  //   useEffect(() => {
  //   axios.get('/getUser')
  //     .then(async res => {
  //       setState(res.data)
  //       let artists = await getArtists(state.token, ['Sum 41', 'Metallica', 'Red Hot Chili Peppers'])

  //       setState(prev => ({...prev, artists}))
  //     }).catch((e) => console.log('error:', e))
  // }, [state.token])

  return (
    <div className="App">
      Token: {state.token}
    </div>
  );
}
