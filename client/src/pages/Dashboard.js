import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { getArtists } from '../helpers/spotifyHelper'
import { getPerformers } from '../helpers/seatGeekHelper'


export default function Dashboard(props) {

  const [state, setState] = useState({ 

      user: {}, 
      token: null, 
      artists: {}, 
      events: {}
      
    })


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

  useEffect(() => {
    if (state.token && state.events && state.events !== {}) {
      getArtists(state.token, state.events)
        .then((artists) => {
          setState(prev => ({ ...prev, artists }))
        })
    }
  }, [state.token, state.events])

  return (
    <div className="App">
      Token: {state.token}
    </div>
    );
  }
