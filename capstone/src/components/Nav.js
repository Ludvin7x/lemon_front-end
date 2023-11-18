import React, { useEffect, useState } from "react";
import "./Nav.css";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../img/Logo.svg";
import icono_menu from "../img/icono_menu.png"

function Nav() {
  const [activeLink, setActiveLink] = useState(""); // Estado para rastrear la ruta actual
  const [showMenu, setShowMenu] = useState(false); // Estado para controlar la visibilidad del menú en dispositivos móviles
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Alternar la visibilidad del menú al hacer clic en el ícono
  };

  useEffect(() => {
    setActiveLink(location.pathname); // Actualiza el estado cuando cambia la ruta
  }, [location]);

  return (
    <nav className="nav">

       {/* Ícono del menú para dispositivos móviles */}
       <div className="mobile-menu-icon" onClick={toggleMenu}>
        <img
          src={icono_menu}
          alt="Menú"
          className="menu-icon"
          style={{ width: "60px", height: "auto" }} // Ajusta el tamaño del ícono aquí (ejemplo: 30px)
        />
      </div>

      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      {/* Lista de opciones */}
      <ul className={`menu ${showMenu ? 'active' : ''}`}>
        <li>
        <NavLink exact activeClassName="selected" to="/" onClick={() => setShowMenu(false)} className={activeLink === "/" ? "selected" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/BookingForm" onClick={() => setShowMenu(false)} className={activeLink === "/BookingForm" ? "selected" : ""}>
            Booking Form
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/Login" onClick={() => setShowMenu(false)} className={activeLink === "/Login" ? "selected" : ""}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;