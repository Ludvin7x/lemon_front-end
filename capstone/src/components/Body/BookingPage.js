import React, { useState } from "react";
import './BookingPage.css'

function BookingPage() {
  const [formData, setFormData] = useState({
    date: "",
    time: "17:00",
    guests: 1,
    occasion: "Birthday",
  });

  const formStyle = {
    display: 'grid',
    maxWidth: '200px',
    gap: '20px'
  };

  const labelStyle = {
    marginBottom: '5px'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar la reserva con los datos en formData
    console.log('Form Data:', formData);
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <label htmlFor="res-date" style={labelStyle}>Choose date</label>
      <input
        type="date"
        id="res-date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <label htmlFor="res-time" style={labelStyle}>Choose time</label>
      <select
        id="res-time"
        name="time"
        value={formData.time}
        onChange={handleChange}
      >
        <option value="17:00">17:00</option>
        <option value="18:00">18:00</option>
        <option value="19:00">19:00</option>
        <option value="20:00">20:00</option>
        <option value="21:00">21:00</option>
        <option value="22:00">22:00</option>
      </select>
      <label htmlFor="guests" style={labelStyle}>Number of guests</label>
      <input
        type="number"
        id="guests"
        name="guests"
        value={formData.guests}
        onChange={handleChange}
        placeholder="1"
        min="1"
        max="10"
      />
      <label htmlFor="occasion" style={labelStyle}>Occasion</label>
      <select
        id="occasion"
        name="occasion"
        value={formData.occasion}
        onChange={handleChange}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>
      <input type="submit" value="Make Your reservation" />
    </form>
  );
}

export default BookingPage;


