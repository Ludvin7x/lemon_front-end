import React, { useEffect, useReducer } from "react";
import { Route, Routes} from "react-router-dom";
import BookingForm from "./Pages/BookingForm";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Order from "./Pages/Order";
import NotFound from "./Pages/NotFound";
import { fetchAPI} from "./API/api";
import MenuPage  from "./Pages/MenuPage";

function updateTimes(state, action) {
  switch (action.type) {
    case 'FETCH_TIMES':
      try {
        const { date } = action.payload;
        const times = fetchAPI(date);
        return times;
      } catch (error) {
        console.error('Error fetching available times:', error);
        return ["ERROR"];
      }
    default:
      return state;
  }
}

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [""]);

  useEffect(() => {
    const fetchInitialTimes = async () => {
      try {
        const currentDate = new Date(); // Obtener la fecha actual
        dispatch({ type: 'FETCH_TIMES', payload: { date: currentDate } }); // Enviar la fecha a través de dispatch
      } catch (error) {
        console.error('Error fetching available times for today:', error);
      }
    };

    fetchInitialTimes(); // Llamar a fetchInitialTimes al montar el componente para obtener las horas iniciales
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/BookingForm"
          element={<BookingForm availableTimes={availableTimes} dispatch={dispatch} />}
        />
        <Route path="/MenuPage" element={<MenuPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Order" element={<Order />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Main;