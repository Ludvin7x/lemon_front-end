import React, { useEffect, useState } from "react";
import "./Nav.css";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../img/Logo.svg";

function Nav() {
  const [activeLink, setActiveLink] = useState(""); // Estado para rastrear la ruta actual
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname); // Actualiza el estado cuando cambia la ruta
  }, [location]);

  return (
    <nav className="nav">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <ul>
        <li>
          <NavLink exact activeClassName="selected" to="/" className={activeLink === "/" ? "selected" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/BookingForm" className={activeLink === "/BookingForm" ? "selected" : ""}>
            Booking Form
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/Login" className={activeLink === "/Login" ? "selected" : ""}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;