import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "../Styles/Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
// import { FaHeart, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        {/* Row 1: Four columns */}
        <Row className="mb-5 footer-top">
          {/* First column with Logo */}
          <Col lg={4} md={12} className="footer-logo mb-4 mb-lg-0 text-md-start text-center">
            <img
              src="https://pgs-website.vercel.app/static/media/Flogo212.da18f59861cad87b2aa3.png"   // 🔹 replace with your logo path
              alt="Logo"
              className="footer-logo-img"
            />
            <p className="footer-brand-text">Tour App Tour AppTour AppTour AppTour AppTour AppTour AppTour AppTour AppTour AppTour AppTour AppTour App</p>
          </Col>

          {/* Other three evenly spaced */}
          <Col lg={2} md={4} sm={6} className="mb-4 mb-md-0">
            <h5>Help & Services</h5>
            <ul>
              <li>How does it work</li>
              <li>FAQs</li>
              <li>Contact</li>
            </ul>
          </Col>
          <Col lg={2} md={4} sm={6} className="mb-4 mb-md-0">
            <h5>To Explore</h5>
            <ul>
              <li>Accommodations</li>
              <li>Experiences</li>
              <li>Blog</li>
            </ul>
          </Col>
          <Col lg={2} md={4} sm={6}>
            <h5>Other Possibilities</h5>
            <ul>
              <li>Give away</li>
              <li>Subscribe</li>
            </ul>
          </Col>
        </Row>

        {/* Row 2: Subscribe + Store Badges */}
        <Row className="align-items-center mb-4 footer-middle">
          <Col md={6} className="text-md-start text-center mb-3 mb-md-0">
            <button className="subscribe-btn d-none d-sm-inline-block">
              Subscribe
            </button>
          </Col>
          <Col md={6} className="text-md-end text-center">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="store-badge"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="store-badge"
            />
          </Col>
        </Row>

        {/* Row 3: Copyright + Social Icons */}
        <hr />
        <Row className="align-items-center footer-bottom">
          <Col md={6} className="text-md-start text-center">
            <p className="copyright">© 2025 TourApp. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end text-center social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
