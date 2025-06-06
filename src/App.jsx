import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/HomePage";
import MenuPage from "./components/Pages/Menu/MenuPage";
import BookingForm from "./components/Pages/BookingForm";
import Login from "./components/Pages/Login";
import MenuItemDetail from "./components/Pages/Menu/MenuItemDetail";
import Cart from "./components/cart/Cart";
import About from "./components/Pages/About";
import Success from "./components/cart/Success";
import Layout from "./components/Layout";
import NotFound from "./components/Pages/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MenuPage" element={<MenuPage />} />
        <Route path="/menu/:id" element={<MenuItemDetail />} />
        <Route path="/BookingForm" element={<BookingForm />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
