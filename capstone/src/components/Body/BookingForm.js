import React, { useState } from "react";
import { submitAPI } from "../API/api";
import Swal from "sweetalert2";
import ConfirmedBooking from "./ConfirmedBooking";
import "./BookingForm.css";

function BookingForm(props) {
  const formStyle = {
    display: "grid",
    maxWidth: "200px",
    gap: "20px",
  };

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("");
  const [guests, setGuest] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [submitted, setSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const currentDate = new Date().toISOString().split("T")[0];

  const handleSubmission = async (e) => {
    e.preventDefault();

    const formData = {
      date,
      time,
      guests,
      occasion,
      // Agrega más campos según lo necesario en tu formulario
    };

    try {
      const submissionResult = await submitAPI(formData);
      if (submissionResult.success === true) {
        setSubmitted(true);
        setBookingData(formData);
        clearForm();
        Swal.fire("¡Formulario enviado exitosamente!", "", "success");
      } else {
        Swal.fire(
          "Falló el envío del formulario",
          submissionResult.message,
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Error al enviar el formulario", error.message, "error");
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setDate(selectedDate.toISOString().split('T')[0]);
    props.dispatch({ type: 'FETCH_TIMES', payload: { date: selectedDate } });
  };

  const clearForm = () => {
    setTime("");
    setGuest(1);
    setOccasion("Birthday");
  };

  return (
    <div className="bookingform">
      {!submitted ? (
        <div className="form-booking">
          <h1>Book Now</h1>
          <form style={formStyle} onSubmit={handleSubmission}>
            <label htmlFor="res-date">Choose date</label>
            <input
              type="date"
              id="res-date"
              min={currentDate} // Establecer el mínimo como la fecha actual
              defaultValue={currentDate} // Valor predeterminado como la fecha actual
              onChange={handleDateChange}
            />
            <label htmlFor="res-time">Choose time</label>
            <select
              id="res-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              aria-label="Select time"
            >
              {props.availableTimes.map((availableTime, index) => (
                <option key={index} value={availableTime}>
                  {availableTime}
                </option>
              ))}
            </select>
            <label htmlFor="guests">Number of guests</label>
            <input
              type="number"
              placeholder="1"
              min="1"
              max="120"
              id="guests"
              value={guests}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 1) {
                  setGuest(value);
                }
              }}
              aria-label="Enter number of guests"
            />
            <label htmlFor="occasion" aria-label="Occasion">
              Occasion
            </label>
            <select
              id="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              aria-label="Select occasion"
            >
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
            </select>
            <input
              type="submit"
              value="Make Your reservation"
              aria-label="On Click: Submit reservation"
            />
          </form>
        </div>
      ) : (
        <ConfirmedBooking bookingDetails={bookingData} />
      )}
    </div>
  );
}

export default BookingForm;
