import React, {useState, useReducer} from "react";
import {Route, Routes, useNavigate } from "react-router-dom";
import BookingForm from "./Body/BookingForm";
import HomePage from "./Body/HomePage";
import Login from "./Body/Login";

function Main() {
  const navigate = useNavigate(); // Obtiene la función de navegación

  const initializeTimes = [
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    ];

  // Function to update availableTimes based on the selected date
  const updateTimes = (selectedDate) => {
    return [
    "19:00",
    "20:00",
    "21:00",
    "22:00",]
  };

  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes);

  return (
    <div>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/BookingForm" element={<BookingForm availableTimes={availableTimes} dispatch={dispatch} />} />
        <Route path="/Login" element={<Login/> } />
    </Routes>
    </div>
  );
}

export default Main;