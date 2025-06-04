import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import ConfirmedBooking from "./ConfirmedBooking";
import { getAvailableTimes, submitBooking } from "../api/apiBooking";
import { useToast } from "../../contexts/ToastContext";
import "./BookingForm.css";

function BookingForm() {
  const { showToast } = useToast();

  const currentDate = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState("");
  const [guests, setGuest] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");

  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const fetchAvailableTimes = async (selectedDate) => {
    setLoadingTimes(true);
    try {
      const { times } = await getAvailableTimes(selectedDate);
      setAvailableTimes(times || []);
      if (!times.includes(time)) {
        setTime("");
      }
    } catch (error) {
      showToast("Error al cargar horarios disponibles.", "danger");
      setAvailableTimes([]);
      setTime("");
    }
    setLoadingTimes(false);
  };

  useEffect(() => {
    fetchAvailableTimes(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (!time) {
      showToast("Por favor selecciona una hora.", "warning");
      return;
    }

    const formData = { date, time, guests, occasion };

    try {
      const result = await submitBooking(formData);
      if (result.ok) {
        setBookingData(result.booking);
        setSubmitted(true);
        clearForm();
        showToast("¡Reserva enviada exitosamente!", "success");
      }
    } catch (err) {
      showToast(err.message || "No se pudo enviar la reserva.", "danger");
    }
  };

  if (submitted) {
    return <ConfirmedBooking bookingDetails={bookingData} />;
  }

  return (
    <Container className="bookingform py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="mb-4 text-center">Book Now</h1>

          <Form onSubmit={handleSubmission} className="d-grid gap-3">
            <Form.Group controlId="res-date">
              <Form.Label>Choose date</Form.Label>
              <Form.Control
                type="date"
                min={currentDate}
                value={date}
                onChange={handleDateChange}
              />
            </Form.Group>

            <Form.Group controlId="res-time">
              <Form.Label>Choose time</Form.Label>
              {loadingTimes ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <Form.Select
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

            <Form.Group controlId="guests">
              <Form.Label>Number of guests</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="120"
                value={guests}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value >= 1) {
                    setGuest(value);
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="occasion">
              <Form.Label>Occasion</Form.Label>
              <Form.Select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              >
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Make Your reservation
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default BookingForm;