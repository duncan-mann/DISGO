import React from 'react'

export default function SpotifyWidget(props) {
  const src = `https://open.spotify.com/embed/album/${props.artistAlbum}`
  console.log(src)
  return (
      <iframe 
        src={src}
        width="300" 
        height="300" 
        frameBorder="0" 
        allowtransparency="true" 
        allow="encrypted-media"
      />
  )
}
