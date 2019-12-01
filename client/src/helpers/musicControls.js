 // pause user's playback
 export const pauseTracks = (player) => {
  player.pause(() => console.log('Paused!'));
  // fetch(`https://api.spotify.com/v1/me/player/pause`, {
  //   method: "PUT",
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //     "Content-Type": "application/json"
  //   }
  // });
}