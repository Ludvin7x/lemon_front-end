import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 mt-5" aria-label="Footer">
      <div className="container-md">
        <div className="row align-items-center text-center text-md-start">
          {/* Contact Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h5>Contact Us</h5>
            <p className="mb-1">123 Citrus Avenue</p>
            <p className="mb-1">Lemon City, FL 12345</p>
            <p>Email: contact@lemonrestaurant.com</p>
            <p>Phone: +1 (234) 567-890</p>
          </div>

          {/* Social Media Section */}
          <div className="col-md-6 mb-3 text-center text-md-end">
            <h5>Follow Us</h5>
            <span className="me-3" style={{ cursor: "default", display: "inline-block" }}>
              <img
                src="/img/icono_whatsapp.png"
                alt="WhatsApp icon"
                width="32"
                aria-hidden="true"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </span>
            <span style={{ cursor: "default", display: "inline-block" }}>
              <img
                src="/img/icono_facebook.png"
                alt="Facebook icon"
                width="32"
                aria-hidden="true"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </span>
          </div>
        </div>

        <hr className="border-secondary my-3" />

        <div className="text-center pb-3">
          <small className="text-light d-block mb-1">
            &copy; {new Date().getFullYear()} Lemon Restaurant.
          </small>
          <small className="text-light d-block">Created by Ludvin F.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;