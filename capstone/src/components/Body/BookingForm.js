import React, { useState} from "react";
import {submitAPI} from "../API/api";
import Swal from 'sweetalert2';
import "./BookingForm.css";

function BookingForm(props) {
  const formStyle = {
    display: "grid",
    maxWidth: "200px",
    gap: "20px",
  };

  const [time, setTime] = useState("17:00");
  const [guests, setGuest] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");

  const handleSubmission = async (e) => {
    e.preventDefault();

    const formData = {
      time,
      guests,
      occasion,
      // Agrega más campos según lo necesario en tu formulario
    };

    try {
      const submissionResult = await submitAPI(formData);
      if (submissionResult.success === true) {
        clearForm();
        Swal.fire('¡Formulario enviado exitosamente!', '', 'success');
      } else {
        Swal.fire('Falló el envío del formulario', submissionResult.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error al enviar el formulario', error.message, 'error');
    }
  };

  //manejo de cambio en el campo de fecha
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value); // Convertir el valor de fecha a un objeto Date
    props.dispatch({ type: 'FETCH_TIMES', payload: { date: selectedDate } });
  };

  const clearForm = () => {
    // Limpia los valores de los campos del formulario
    setTime('');
    setGuest('');
    setOccasion('');
    // Limpia más campos según sea necesario en tu formulario
  };

  return (
    <div>
      <h1>Book Now</h1>
      <form style={formStyle} onSubmit={handleSubmission}>
        <label htmlFor="res-date">Choose date</label>
        <input type="date" id="res-date" onChange={handleDateChange} />
        <label htmlFor="res-time">Choose time</label>
        <select id="res-time" value={time} onChange={(e) => setTime(e.target.value)}>
          {
          props.availableTimes.map((availableTime, index) => (
            <option key={index} value={availableTime}>
              {availableTime}
            </option>
          )) }
        </select>
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          value={guests}
          onChange={(e) => setGuest(e.target.value)}
        />
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