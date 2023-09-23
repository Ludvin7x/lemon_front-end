import React, { useState } from "react";
import './BookingPage.css'

function BookingPage() {
  const formStyle = {
    display: 'grid',
    maxWidth: '200px',
    gap: '20px'
  };

  const labelStyle = {
    marginBottom: '5px'
  };

  return (
    <form style={formStyle}>
      <label htmlFor="res-date" style={labelStyle}>Choose date</label>
      <input type="date" id="res-date" />
      <label htmlFor="res-time" style={labelStyle}>Choose time</label>
      <select id="res-time">
        <option>17:00</option>
        <option>18:00</option>
        <option>19:00</option>
        <option>20:00</option>
        <option>21:00</option>
        <option>22:00</option>
      </select>
      <label htmlFor="guests" style={labelStyle}>Number of guests</label>
      <input type="number" placeholder="1" min="1" max="10" id="guests" />
      <label htmlFor="occasion" style={labelStyle}>Occasion</label>
      <select id="occasion">
        <option>Birthday</option>
        <option>Anniversary</option>
      </select>
      <input type="submit" value="Make Your reservation" />
    </form>
  );
}

export default BookingPage;

