import React, {useState} from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";
import HomePage from "./HomePage";
import Login from "./Login";

function Main() {
    const navigate = useNavigate(); // Obtiene la función de navegación
    const [availableTimes, setAvailableTimes] = useState([
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    ]);

  return (
    <div>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/BookingForm" element={<BookingForm availableTimes={availableTimes}/>} />
        <Route path="/Login" element={<Login/> } />
    </Routes>
    </div>
  );
}

export default Main;