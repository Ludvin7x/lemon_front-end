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
      {/* Agrega más campos según los datos que desees mostrar */}
    </div>
  );
}

export default ConfirmedBooking;
