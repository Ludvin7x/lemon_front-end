import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { CheckCircle, CalendarBlank, Clock, UsersThree, Sparkle } from "phosphor-react";

const ConfirmedBooking = ({ bookingDetails }) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="py-12 px-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <header className="bg-green-600 text-white text-center py-6 rounded-t-lg">
        <CheckCircle size={36} weight="bold" className="mx-auto mb-2" />
        <h2 className="text-2xl font-semibold">🎉 Reservation Confirmed</h2>
      </header>

      <section className="mt-6 text-gray-700 text-center">
        <p className="mb-8 text-lg">
          Thank you for booking with us! Here are your booking details:
        </p>

        <ul className="text-left space-y-4">
          <li className="flex items-center gap-3">
            <CalendarBlank size={24} className="text-green-600" />
            <span>
              <strong>Fecha:</strong> {bookingDetails.date}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Clock size={24} className="text-green-600" />
            <span>
              <strong>Hora:</strong> {bookingDetails.time}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <UsersThree size={24} className="text-green-600" />
            <span>
              <strong>Invitados:</strong> {bookingDetails.guests}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Sparkle size={24} className="text-green-600" />
            <span>
              <strong>Ocasión:</strong> {bookingDetails.occasion}
            </span>
          </li>
        </ul>

        <Button
          variant="outline"
          className="mt-10 w-full"
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </section>
    </div>
  );
};

export default ConfirmedBooking;