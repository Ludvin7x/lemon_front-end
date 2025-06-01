import React, { useState, useEffect } from "react";
import { Alert, Spinner, Button, Form } from "react-bootstrap";
import ConfirmedBooking from "./ConfirmedBooking";
import "./BookingForm.css";

function BookingForm() {
  const formStyle = {
    display: "grid",
    maxWidth: "200px",
    gap: "20px",
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState("");
  const [guests, setGuest] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");

  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });

  // Función para obtener horarios disponibles del backend según la fecha
  const fetchAvailableTimes = async (selectedDate) => {
    setLoadingTimes(true);
    try {
      // Cambia esta URL por la de tu backend real que devuelva horarios disponibles
      const response = await fetch(`https://tu-backend/api/available-times?date=${selectedDate}`);
      if (!response.ok) throw new Error("Error al obtener horarios");
      const data = await response.json();

      setAvailableTimes(data.times || []);
      // Si no hay hora seleccionada o la hora seleccionada no está en la lista, la reseteamos
      if (!data.times.includes(time)) {
        setTime("");
      }
    } catch (error) {
      setAlert({ show: true, variant: "danger", message: "Error al cargar horarios disponibles." });
      setAvailableTimes([]);
      setTime("");
    }
    setLoadingTimes(false);
  };

  // Cargar horarios disponibles al cargar el componente con la fecha inicial
  useEffect(() => {
    fetchAvailableTimes(date);
  }, []);

  // Maneja el cambio de fecha
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    fetchAvailableTimes(selectedDate);
  };

  const clearForm = () => {
    setTime("");
    setGuest(1);
    setOccasion("Birthday");
  };

  // Manejo del submit solo localmente (no se envía a backend)
  const handleSubmission = (e) => {
    e.preventDefault();

    if (!time) {
      setAlert({ show: true, variant: "warning", message: "Por favor selecciona una hora." });
      return;
    }

    const formData = {
      date,
      time,
      guests,
      occasion,
    };

    setBookingData(formData);
    setSubmitted(true);
    clearForm();
    setAlert({ show: true, variant: "success", message: "¡Formulario enviado exitosamente!" });
  };

  return (
    <div className="bookingform">
      {!submitted ? (
        <div className="form-booking">
          <h1>Book Now</h1>

          {alert.show && (
            <Alert
              variant={alert.variant}
              onClose={() => setAlert({ show: false, variant: "", message: "" })}
              dismissible
            >
              {alert.message}
            </Alert>
          )}

          <Form style={formStyle} onSubmit={handleSubmission}>
            <Form.Group className="mb-3" controlId="res-date">
              <Form.Label>Choose date</Form.Label>
              <Form.Control
                type="date"
                min={currentDate}
                value={date}
                onChange={handleDateChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="res-time">
              <Form.Label>Choose time</Form.Label>
              {loadingTimes ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <Form.Select
                  aria-label="Select time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">-- Select time --</option>
                  {availableTimes.map((availableTime, index) => (
                    <option key={index} value={availableTime}>
                      {availableTime}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="guests">
              <Form.Label>Number of guests</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="120"
                value={guests}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 1) {
                    setGuest(value);
                  }
                }}
                aria-label="Enter number of guests"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="occasion">
              <Form.Label>Occasion</Form.Label>
              <Form.Select
                aria-label="Select occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              >
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary" aria-label="Submit reservation">
              Make Your reservation
            </Button>
          </Form>
        </div>
      ) : (
        <ConfirmedBooking bookingDetails={bookingData} />
      )}
    </div>
  );
}

export default BookingForm;