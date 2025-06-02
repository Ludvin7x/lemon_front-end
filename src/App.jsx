import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Nav";
import Home from "./components/Pages/HomePage";
import MenuPage from "./components/Pages/MenuPage";
import BookingForm from "./components/Pages/BookingForm";
import Order from "./components/Pages/Order";
import Login from "./components/Pages/Login";
import MenuItemDetail from "./components/Pages/MenuItemDetail";


export default function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MenuPage" element={<MenuPage />} />
        <Route path="/menu/:id" element={<MenuItemDetail />} />
      {/*  <Route path="/BookingForm" element={<BookingForm />} /> */}
        <Route path="/Order" element={<Order />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}