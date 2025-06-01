import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>Little Lemon &copy; {new Date().getFullYear()} Todos los derechos reservados</p>
      <div className="social-links">
        <a href="link-de-facebook">
          <img src="/img/icono_facebook.png" alt="Facebook" />
        </a>
        <a href="link-de-whatsapp">
          <img src="/img/icono_whatsapp.png" alt="WhatsApp" />
        </a>
      </div>
    </div>
  );
};

export default Footer;