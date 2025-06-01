import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import "./Nav.css";
import Logo from "../img/Logo.svg";
import icono_menu from "../img/icono_menu.png";
import icono_order from "../img/icono_order.png";

export default function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);  // Estado para scroll
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    setExpanded(false); // Cierra menú al cambiar ruta
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {  // Cambia el valor a tu gusto
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      fixed="top"
      expanded={expanded}
      className={`mb-4 ${scrolled ? "navbar-scrolled" : "navbar-top"}`}
    >
      <Container>
        <Navbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setExpanded(!expanded)}
        >
          <img
            src={icono_menu}
            alt="Menú"
            style={{ width: "40px", height: "auto" }}
          />
        </Navbar.Toggle>

        <Navbar.Brand as={NavLink} to="/">
          <img
            src={Logo}
            alt="Logo"
            className="d-inline-block align-top"
            style={{ height: "50px" }}
          />
        </Navbar.Brand>

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className={({ isActive }) => isActive ? "selected" : ""}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/MenuPage" className={({ isActive }) => isActive ? "selected" : ""}>Menu</Nav.Link>
            <Nav.Link as={NavLink} to="/BookingForm" className={({ isActive }) => isActive ? "selected" : ""}>Booking Form</Nav.Link>
            <Nav.Link as={NavLink} to="/Order" className={({ isActive }) => isActive ? "selected" : ""}>
              Order Now
              <img
                src={icono_order}
                alt="Order"
                className="order-icon"
                style={{ width: "30px", height: "auto", marginLeft: "5px" }}
              />
            </Nav.Link>
          </Nav>

          <Nav>
            {user ? (
              <NavDropdown title={user.username} id="user-dropdown" align="end">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/Login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}