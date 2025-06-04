import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Nav";
import Home from "./components/Pages/HomePage";
import MenuPage from "./components/Pages/MenuPage";
import BookingForm from "./components/Pages/BookingForm";
import Login from "./components/Pages/Login";
import MenuItemDetail from "./components/Pages/MenuItemDetail";
import Cart from "./components/cart/Cart";
import About from "./components/Pages/About";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MenuPage" element={<MenuPage />} />
          <Route path="/menu/:id" element={<MenuItemDetail />} />
          <Route path="/BookingForm" element={<BookingForm />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}