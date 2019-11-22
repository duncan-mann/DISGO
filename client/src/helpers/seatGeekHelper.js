import axios from "axios"

export const getPerformers = () => {
  return axios.get(`https://api.seatgeek.com/2/events?venue.city=toronto&datetime_utc.gte=2019-11-21T00:00:00&datetime_utc.lte=2020-02-02T23:59:59&taxonomies.name=concert&per_page=400&client_id=MTk1NDA1NjF8MTU3NDE4NzA5OS41OQ`)
    .then(res => {
      const allEvents = res.data.events
      const events = {};
      console.log('Test', allEvents[20])
      ////// performers ////////
      for (let event in allEvents) {
        let performer = allEvents[event].performers
        for (let artist in performer) {
          if (!events[performer[artist].name] && performer[artist].name !== "TIFF Bell Lightbox") {
            events[performer[artist].name] = [allEvents[event].id]
          } else if (performer[artist].name !== "TIFF Bell Lightbox") {
            events[performer[artist].name].push(allEvents[event].id)
          }
        }
      }
      return events
    })
  }

