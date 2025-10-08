// export default Navbar;
import React,{useState} from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../Styles/header.css";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg fixed-top custom-navbar shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo = Home link */}
        <Link className="navbar-brand fw-bold logo-text" to="/" onClick={closeNavbar}>
          <span className="d-none d-sm-inline">THE JOURNEY LOOP</span>
          <span className="d-inline d-sm-none text-white">PGS</span>
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler ms-2"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.146a.5.5 0 0 1 .708 0L8 
                7.293l5.146-5.147a.5.5 0 0 1 
                .708.708L8.707 8l5.147 5.146a.5.5 
                0 0 1-.708.708L8 8.707l-5.146 
                5.147a.5.5 0 0 1-.708-.708L7.293 
                8 2.146 2.854a.5.5 0 0 1 
                0-.708z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12.5a.5.5 0 0 1 0-1h11a.5.5 
                  0 0 1 0 1h-11zm0-4a.5.5 0 0 1 
                  0-1h11a.5.5 0 0 1 0 1h-11zm0-4a.5.5 
                  0 0 1 0-1h11a.5.5 0 0 1 
                  0 1h-11z"
                />
              </svg>
            )}
          </span>
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse justify-content-center ${isOpen ? "show" : ""}`}
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/about-us" onClick={closeNavbar}>
                About Us
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/faq" onClick={closeNavbar}>
                FAQ
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/cities" onClick={closeNavbar}>
                Explore Cities
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/Why-Choose-Us" onClick={closeNavbar}>
                Why Choose Us
              </Link>
            </li>

            {/* Dropdown: Services */}
            <li className="nav-item dropdown mx-2">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="servicesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </Link>
              <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                <li>
                  <Link className="dropdown-item" to="/rentacar" onClick={closeNavbar}>
                    Rent a Car
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/tours" onClick={closeNavbar}>
                    Tours
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/upcomingtours" onClick={closeNavbar}>
                    Upcoming Tours
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/ride-courier" onClick={closeNavbar}>
                    Ride & Courier
                  </Link>
                </li>
              </ul>
            </li>

            {/* Get in touch button (only visible on small screens) */}
            <li className="nav-item mx-2 d-lg-none mt-2">
              <Link
                className="btn btn-outline-primary rounded-pill w-100"
                to="/contactus"
                onClick={closeNavbar}
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>

        {/* Right-side button (desktop view) */}
        <div className="d-none d-lg-flex">
          <Link
            className="btn btn-outline-primary rounded-pill get-in-touch-btn"
            to="/contactus"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




