import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { getArtists } from '../helpers/spotifyHelper'
import { getPerformers } from '../helpers/seatGeekHelper'


export default function Dashboard(props) {

  const [state, setState] = useState({ 

      user: {}, 
      token: null, 
      artists: {}, 
      events: [] 
      
    })

    const testEvents = [ 
      {
        artist: "Kanye West", 
        event_id: 1
      },
      {
        artist: "Drake", 
        event_id: 2
      },
      {
        artist: "Michael Jackson", 
        event_id: 3
      },
    ]

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
    if (state.token && state.events && state.events.length > 0) {
      getArtists(state.token, testEvents)
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
