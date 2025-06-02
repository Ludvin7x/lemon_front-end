import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { ShoppingCart } from "phosphor-react";
import "./Nav.css";


const logo = "/img/logo.png";
const iconoMenu = "/img/icono_menu.png";
const iconoOrder = "/img/icono_order.png";
const iconoCart = "/img/icono_cart.svg";

export default function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { cart } = useCart();

  const totalQuantity = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    className={`app__nav mb-4 ${scrolled ? "navbar-scrolled" : "navbar-top"}`}
  >
    <Container>
      <Navbar.Toggle
        aria-controls="main-navbar"
        onClick={() => setExpanded(!expanded)}
      >
        <img src={iconoMenu} alt="Menú" style={{ width: "40px" }} />
      </Navbar.Toggle>

      <Navbar.Brand as={NavLink} to="/">
        <img src={logo} alt="Logo" style={{ height: "50px" }} />
      </Navbar.Brand>

      <Navbar.Collapse id="main-navbar">
        <Nav className="me-auto">
          <Nav.Link
            as={NavLink}
            to="/"
            className={({ isActive }) => (isActive ? "selected" : "")}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/MenuPage"
            className={({ isActive }) => (isActive ? "selected" : "")}
          >
            Menu
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link as={NavLink} to="/Order" className="position-relative">
            <ShoppingCart
              size={30}
              weight={totalQuantity > 0 ? "fill" : "regular"}
              color={totalQuantity > 0 ? "#22c55e" : "#9ca3af"}
            />
            {totalQuantity > 0 && (
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
              >
                {totalQuantity}
              </Badge>
            )}
          </Nav.Link>

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
)
}