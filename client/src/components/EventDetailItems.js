import React from 'react'

export default function EventDetailItems(props) {
  console.log("PROP OF VENUE! ===>", props.venue)
  console.log("PROP OF VENUE! ===>", props.address)
  console.log("PROP OF VENUE! ===>", props.date)
  console.log("PROP OF VENUE! ===>", props.avgTicketPrice)
  console.log("PROP OF VENUE! ===>", props.url)
  return (
    <li>
      <p>Venue: {props.venue}</p>
      <p>Address: {props.address}</p>
      <p>Date: {props.date}</p>
      <p>Average Ticket Price: {props.avgTicketPrice ? `$${props.avgTicketPrice}` : "SOLD OUT!"}</p>
      <a href={props.url}>Purchase Ticket</a>
    </li>
  )
}
