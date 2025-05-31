import React, { useEffect, useState } from "react";
import "./Nav.css";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../img/Logo.svg";
import icono_menu from "../img/icono_menu.png";
import icono_order from "../img/icono_order.png";

function Nav() {
  const [showMenu, setShowMenu] = useState(false); // Estado para el menú móvil
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Cierra menú al cambiar de ruta
  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  return (
    <nav className="nav">
      {/* Ícono del menú para móvil */}
      <div className="mobile-menu-icon" onClick={toggleMenu}>
        <img
          src={icono_menu}
          alt="Menú"
          className="menu-icon"
          style={{ width: "60px", height: "auto" }}
        />
      </div>

      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      {/* Lista de opciones */}
      <ul className={`menu ${showMenu ? "active" : ""}`}>
        {/* Home y Menu juntos */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "selected" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/MenuPage"
            className={({ isActive }) => (isActive ? "selected" : "")}
          >
            Menu
          </NavLink>
        </li>

        {/* Otros links */}
        <li>
          <NavLink
            to="/BookingForm"
            className={({ isActive }) => (isActive ? "selected" : "")}
          >
            Booking Form
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Login"
            className={({ isActive }) => (isActive ? "selected" : "")}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Order"
            className={({ isActive }) => (isActive ? "selected" : "")}
          >
            Order Now
            <img
              src={icono_order}
              alt="Order"
              className="order-icon"
              style={{ width: "40px", height: "auto", marginLeft: "5px" }}
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;