import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/img/logo.png";
import { ShoppingCart, List, X, ChevronDown } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";

export default function NavigationBar() {
  const { totalItems, resetCart } = useCart();
  const { user, logout } = useUser(); // Aquí solo user y logout
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar el menú de usuario si clic afuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); 
    resetCart(); 
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate("/Login");
  };

  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-green-600 dark:text-green-400"
        : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
    } focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Hamburger + Logo */}
          <div className="flex items-center lg:hidden space-x-3">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-md hover:bg-green-100 dark:hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            >
              <List size={28} />
            </button>
            <NavLink to="/" aria-label="Home">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-10">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/MenuPage" className={navLinkClass}>
              Menu
            </NavLink>
            <NavLink to="/BookingForm" className={navLinkClass}>
              Booking
            </NavLink>
            <NavLink to="/About" className={navLinkClass}>
              About
            </NavLink>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-6 relative">
            <NavLink
              to="/Cart"
              className="relative text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
              aria-label="Shopping cart"
            >
              <ShoppingCart
                size={28}
                weight={totalItems > 0 ? "fill" : "regular"}
                className="transition-colors duration-300"
              />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5 animate-pulse">
                  {totalItems}
                </span>
              )}
            </NavLink>

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                  aria-label="User menu"
                >
                  <span>{user.name || user.username || "User"}</span>
                  <ChevronDown size={16} />
                </button>
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-label="User menu options"
                  >
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/Login"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm lg:hidden"
          role="dialog"
          aria-modal="true"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 p-6 shadow-lg overflow-y-auto z-60"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                <img src={logo} alt="Logo" className="h-10 w-auto" />
              </NavLink>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-green-100 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/MenuPage"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Menu
              </NavLink>
              <NavLink
                to="/BookingForm"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Booking
              </NavLink>
              <NavLink
                to="/About"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                About
              </NavLink>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-left text-red-600 dark:text-red-400 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/Login"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}