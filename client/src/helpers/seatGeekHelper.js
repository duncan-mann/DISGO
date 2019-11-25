import axios from "axios";

export const getPerformers = () => {
  return axios
    .get(
      `https://api.seatgeek.com/2/events?venue.city=toronto&datetime_utc.gte=2019-12-01T00:00:00&datetime_utc.lte=2020-01-09T23:59:59&taxonomies.name=concert&per_page=400&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`
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
  if (eventArr !== {}) {
    let artistEvent = [];
    for (let artist in eventArr) {
      if (artist === currentArtist) {
        console.log("Check if artists match for getEventDetails ==>", artist, currentArtist)
        let events = eventArr[artist];
        for (let event in events) {
          axios
            .get(
              `https://api.seatgeek.com/2/events/${events[event]}?&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`
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
