// Preloader.js
import React, { useEffect, useState } from "react";
import "../Styles/phoneinput.css"; // Custom SCSS file
import { useLocation } from "react-router-dom";


const Preloader = ({ duration = 1500 }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timer);
  }, [location, duration]); // run on every route change

  if (!loading) return null;

  return (
    <div className="preloader">
      The Journey Loop
      {/* <img src="/logo.png" alt="Logo" className="preloader-logo" /> */}
    </div>
  );
};

export default Preloader;
