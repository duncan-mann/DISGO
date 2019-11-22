import axios from "axios";

export const getPerformers = () => {
  return axios
    .get(
      `https://api.seatgeek.com/2/events?venue.city=toronto&datetime_utc.gte=2020-01-02T00:00:00&datetime_utc.lte=2020-03-02T23:59:59&taxonomies.name=concert&per_page=400&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`
    )
    .then(res => {
      const allEvents = res.data.events;
      const events = {};
      console.log("Test", allEvents[20]);
      ////// performers ////////
      for (let event in allEvents) {
        let performer = allEvents[event].performers;
        for (let artist in performer) {
          if (
            !events[performer[artist].name] &&
            performer[artist].name !== "TIFF Bell Lightbox"
          ) {
            events[performer[artist].name] = [allEvents[event].id];
          } else if (performer[artist].name !== "TIFF Bell Lightbox") {
            events[performer[artist].name].push(allEvents[event].id);
          }
        }
      }
      return events;
    });
};

export const getEventDetails = arr => {
  if (arr !== {}) {
    for (let artist in arr) {
      if (artist === "Deadmau5") {
        let artistEvent = [];
        let events = arr[artist];
        for (let event in events) {
          axios
            .get(
              `https://api.seatgeek.com/2/events/${events[event]}?&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`
            )
            .then(res => {
              artistEvent.push(res.data);
            });
        }
        console.log("Event detail for Deadmau5 ==>", artistEvent);
        return artistEvent;
      }
    }
  }
};
