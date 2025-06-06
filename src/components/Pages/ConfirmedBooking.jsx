import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  CheckCircle,
  CalendarBlank,
  Clock,
  UsersThree,
  Sparkle,
} from "phosphor-react";

const ConfirmedBooking = ({ bookingDetails }) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="py-12 px-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <header className="bg-green-600 dark:bg-green-700 text-white text-center py-6 rounded-t-lg">
        <CheckCircle size={36} weight="bold" className="mx-auto mb-2" />
        <h2 className="text-2xl font-semibold">🎉 Reservation Confirmed</h2>
      </header>

      <section className="mt-6 text-gray-800 dark:text-gray-300 text-center">
        <p className="mb-8 text-lg">
          Thank you for booking with us! Here are your booking details:
        </p>

        <ul className="text-left space-y-5">
          <li className="flex items-center gap-4">
            <CalendarBlank
              size={24}
              className="text-green-600 dark:text-green-400 flex-shrink-0"
              aria-label="Fecha"
            />
            <span>
              <strong className="font-semibold">Fecha:</strong> {bookingDetails.date}
            </span>
          </li>
          <li className="flex items-center gap-4">
            <Clock
              size={24}
              className="text-green-600 dark:text-green-400 flex-shrink-0"
              aria-label="Hora"
            />
            <span>
              <strong className="font-semibold">Hora:</strong> {bookingDetails.time}
            </span>
          </li>
          <li className="flex items-center gap-4">
            <UsersThree
              size={24}
              className="text-green-600 dark:text-green-400 flex-shrink-0"
              aria-label="Invitados"
            />
            <span>
              <strong className="font-semibold">Invitados:</strong> {bookingDetails.guests}
            </span>
          </li>
          <li className="flex items-center gap-4">
            <Sparkle
              size={24}
              className="text-green-600 dark:text-green-400 flex-shrink-0"
              aria-label="Ocasión"
            />
            <span>
              <strong className="font-semibold">Ocasión:</strong> {bookingDetails.occasion}
            </span>
          </li>
        </ul>

        <Button
          variant="outline"
          className="mt-10 w-full dark:text-green-400 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-800 transition"
          onClick={handleBackToHome}
          aria-label="Volver al inicio"
        >
          Back to Home
        </Button>
      </section>
    </div>
  );
};

export default ConfirmedBooking;