import React, { useState } from "react";
import "./BookingForm.css";

function BookingForm(props) {
  const formStyle = {
    display: "grid",
    maxWidth: "200px",
    gap: "20px",
  };

  // State variables for form fields
  const [date, setDate] = useState("");
  const [time, setTime] = useState("17:00");
  const [guests, setGuest] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");

  // Handle form Submission
  const handleSubmission = (e) => {
    e.preventDefault();
    // You can access form fields and their values here (date, time, guests, occasion)
    // Handle form submission logic here
  };

  return (
    <div>
      <form style={formStyle} onSubmit={handleSubmission}>
        <label htmlFor="res-date">Choose date</label>
        <input type="date" id="res-date" value={date} onChange={(e) => setDate(e.target.value)} />
        <label htmlFor="res-time">Choose time</label>
        <select id="res-time" value={time} onChange={(e) => setTime(e.target.value)}>
          {props.availableTimes.map((availableTime, index) => (
              <option key={index} value={availableTime}>
                {availableTime}
              </option>
          ))}
        </select>
        <label htmlFor="guests">Number of guests</label>
        <input type="number" placeholder="1" min="1" max="10" id="guests" value={guests} onChange={(e) => setGuest(e.target.value)} />
        <label htmlFor="occasion">Occasion</label>
        <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        <input type="submit" value="Make Your reservation" />
      </form>
    </div>
  );
}


export default BookingForm;



