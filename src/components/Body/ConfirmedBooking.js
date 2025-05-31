import React from "react";
import "./ConfirmedBooking.css"

function ConfirmedBooking({ bookingDetails }) {
  return (
    <div className="confirmed-booking">
      <h2>Confirmed Booking Details</h2>
      <p>Date: {bookingDetails.date}</p>
      <p>Time: {bookingDetails.time}</p>
      <p>Guests: {bookingDetails.guests}</p>
      <p>Occasion: {bookingDetails.occasion}</p>
    </div>
  );
}

export default ConfirmedBooking;
