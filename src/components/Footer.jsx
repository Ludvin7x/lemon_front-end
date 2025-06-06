import React from "react";
import { WhatsappLogo, FacebookLogo } from "phosphor-react";

const Footer = () => {
  return (
    <footer
      className="bg-gray-900 text-white pt-8 mt-12"
      aria-label="Footer"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between text-center md:text-left gap-6">
          {/* Contact Section */}
          <div className="md:w-1/2 space-y-1">
            <h5 className="text-lg font-semibold">Contact Us</h5>
            <p className="text-gray-300">123 Citrus Avenue</p>
            <p className="text-gray-300">Lemon City, FL 12345</p>
            <p className="text-gray-300">
              Email:{" "}
              <a
                href="mailto:contact@lemonrestaurant.com"
                className="underline hover:text-yellow-400"
              >
                contact@lemonrestaurant.com
              </a>
            </p>
            <p className="text-gray-300">
              Phone:{" "}
              <a
                href="tel:+1234567890"
                className="underline hover:text-yellow-400"
              >
                +1 (234) 567-890
              </a>
            </p>
          </div>

          {/* Social Media Section */}
          <div className="md:w-1/2 flex justify-center md:justify-end gap-6 items-center">
            <h5 className="text-lg font-semibold">Follow Us</h5>
            <WhatsappLogo
              size={32}
              weight="fill"
              className="text-white"
              aria-hidden="true"
            />
            <FacebookLogo
              size={32}
              weight="fill"
              className="text-white"
              aria-hidden="true"
            />
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        <div className="text-center pb-4 text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Lemon Restaurant.</p>
          <p>Created by Ludvin F.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;