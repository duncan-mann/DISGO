import React from 'react'

export default function EventDetails(props) {

  return (
    <div>
      <h2>This is the Event Details!</h2>
        <ul>
          <li>Venue: {props.venue}</li>
          <li>Address: {props.address}</li>
          <li>Date: {props.date}</li>
          <li>Average Ticket Price: {props.avgTicketPrice}</li>
          <a href={props.url}>Purchase Ticket</a>
        </ul>
    </div>
  )
}
