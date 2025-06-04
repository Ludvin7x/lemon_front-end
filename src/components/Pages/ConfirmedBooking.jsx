import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ConfirmedBooking = ({ bookingDetails }) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center shadow border-0">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">🎉 Reservation Confirmed</h4>
            </Card.Header>
            <Card.Body>
              <Card.Text className="mb-4">
                Thank you for booking with us! Here are your booking details
              </Card.Text>
              <ListGroup variant="flush" className="text-start">
                <ListGroup.Item><strong>📅 Fecha:</strong> {bookingDetails.date}</ListGroup.Item>
                <ListGroup.Item><strong>⏰ Hora:</strong> {bookingDetails.time}</ListGroup.Item>
                <ListGroup.Item><strong>👥 Invitados:</strong> {bookingDetails.guests}</ListGroup.Item>
                <ListGroup.Item><strong>🎈 Ocasión:</strong> {bookingDetails.occasion}</ListGroup.Item>
              </ListGroup>
              <Button 
                variant="outline-success" 
                onClick={handleBackToHome} 
                className="mt-4"
              >
                Back to Home
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmedBooking;