import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../Styles/whatsapp.css"; 

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/923037778240" // replace with your number (country code, no + or 0)
      target="_blank"
      rel="noopener noreferrer"
      className="wa-button"
      aria-label="Need help? Chat on WhatsApp"
    >
      {/* WhatsApp icon via Bootstrap Icons */}
      <i className="bi bi-whatsapp wa-icon" aria-hidden="true"></i>
      <span className="wa-text">Need help? Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsappButton;

