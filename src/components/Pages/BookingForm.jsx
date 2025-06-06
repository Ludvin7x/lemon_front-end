import React, { useState, useEffect } from "react";
import {
  CalendarBlank,
  Clock,
  UsersThree,
  Sparkle,
} from "phosphor-react";
import ConfirmedBooking from "./ConfirmedBooking";
import { getAvailableTimes, submitBooking } from "../api/apiBooking";
import { useToast } from "../../contexts/ToastContext";

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
      showToast("Failed to load available times.", "danger");
      setAvailableTimes([]);
      setTime("");
    }
    setLoadingTimes(false);
  };

  useEffect(() => {
    fetchAvailableTimes(date);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      showToast("Please select a time.", "warning");
      return;
    }

    const formData = { date, time, guests, occasion };

    try {
      const result = await submitBooking(formData);
      if (result.ok) {
        setBookingData(result.booking);
        setSubmitted(true);
        clearForm();
        showToast("Reservation submitted successfully!", "success");
      }
    } catch (err) {
      showToast(err.message || "Reservation could not be submitted.", "danger");
    }
  };

  if (submitted) {
    return <ConfirmedBooking bookingDetails={bookingData} />;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-lg mt-12">
      <h1 className="text-3xl font-semibold text-center text-white mb-8">
        Make a Reservation
      </h1>

      <form onSubmit={handleSubmission} className="space-y-6">
        {/* Date */}
        <div>
          <label
            htmlFor="res-date"
            className="flex items-center gap-2 text-white font-medium mb-2"
          >
            <CalendarBlank size={20} weight="bold" />
            Choose date
          </label>
          <input
            type="date"
            id="res-date"
            min={currentDate}
            value={date}
            onChange={handleDateChange}
            className="w-full rounded-md border border-gray-700 bg-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Time */}
        <div>
          <label
            htmlFor="res-time"
            className="flex items-center gap-2 text-white font-medium mb-2"
          >
            <Clock size={20} weight="bold" />
            Choose time
          </label>
          {loadingTimes ? (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-6 w-6 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          ) : (
            <select
              id="res-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Select time --</option>
              {availableTimes.map((availableTime, index) => (
                <option key={index} value={availableTime}>
                  {availableTime}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Guests */}
        <div>
          <label
            htmlFor="guests"
            className="flex items-center gap-2 text-white font-medium mb-2"
          >
            <UsersThree size={20} weight="bold" />
            Number of guests
          </label>
          <input
            type="number"
            id="guests"
            min="1"
            max="120"
            value={guests}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= 1) {
                setGuest(value);
              }
            }}
            className="w-full rounded-md border border-gray-700 bg-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Occasion */}
        <div>
          <label
            htmlFor="occasion"
            className="flex items-center gap-2 text-white font-medium mb-2"
          >
            <Sparkle size={20} weight="bold" />
            Occasion
          </label>
          <select
            id="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full rounded-md border border-gray-700 bg-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md py-3 transition-colors duration-200"
        >
          Make your reservation
        </button>
      </form>
    </div>
  );
}

export default BookingForm;