import axios from "axios";

export const getPerformers = (startDate, endDate) => {
  console.log('start', startDate, 'end', endDate)
  return axios
    .get(
      `https://api.seatgeek.com/2/events?venue.city=toronto&datetime_utc.gte=${startDate}T00:00:00&datetime_utc.lte=${endDate}T23:59:59&taxonomies.name=concert&per_page=400&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`
    )
    .then(res => {
      const allEvents = res.data.events;
      const events = {};
      ////// performers ////////
      for (let event in allEvents) {
        let performer = allEvents[event].performers;
        for (let artist in performer) {
          if (!events[performer[artist].name]) {
            events[performer[artist].name] = [allEvents[event].id];
          } else {
            events[performer[artist].name].push(allEvents[event].id);
          }
        }
      }
      return events;
    });
};

export const getEventDetails = (eventArr, currentArtist) => {
  let artistEvent = [];
  if (eventArr !== {}) {
    // currentArtist = currentArtist.join(",").toLowerCase().split(", ")
    // console.log("THIS IS THE ARTIST JOIN", currentArtist)
    for (let artist in eventArr) {

      if (currentArtist.length > 0 && currentArtist.includes(artist.toLowerCase())) {
        // console.log("ARtIST NAME LOWERCASE!! ==>", artist.toLowerCase())
        // console.log("array of artists", currentArtist, "current artist", artist)
      // console.log("SEATGEEK , SPOTIFY", artist, currentArtist)
      // console.log("This is the current artist name from spotify", artist)
      // console.log("Array of keys", Object.keys(currentArtist), "This is the artist =====>", artist)

        // console.log("Check if artists match for getEventDetails ==>", artist, currentArtist)
        let events = eventArr[artist];
        // console.log("This is the event id for current artist",events)
        for (let event of events) {
          axios
            .get(
              `https://api.seatgeek.com/2/events/${event}?&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`
            )
            .then(res => {
              // if (res.data.stats.average_price === null) {
              //   return;
              // }
              artistEvent.push(res.data);
            });
        }
      }
    }
    return Promise.resolve(artistEvent);
  }
};
