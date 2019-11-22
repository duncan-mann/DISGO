import React, { useEffect, useState } from 'react';
import './SongListItem.scss';

export default function SongListItem(props) {
  
  // initialize state: Spotify Playback SDK (incorporate into master state later)
  const [playing, setPlaying] = useState(false);
  const [token, setToken] = useState(
    'XXX'
  );
  const [deviceId, SetDeviceId] = useState(null);
  const [currentPlayer, SetPlayer] = useState(null);

  // On Mount, load Spotify Web Playback SDK script
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.head.appendChild(script);
  }, [])

  return (
    <div className='SongListItem'>
      Hello World!
      
    </div>
  );
}