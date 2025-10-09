import React, { useEffect, useState } from "react";
import "../Styles/phoneinput.css"; // Custom SCSS file
import MyLogo from "../Assets/Flogo1.png";
import { useLocation } from "react-router-dom";

const Preloader = ({ duration = 1500 }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timer);
  }, [location, duration]);

  if (!loading) return null;

  return (
    <div className="preloader" role="status" aria-live="polite" aria-busy="true">
      <div className="preloader-inner">
        <div className="logo-wrap" aria-hidden="true">
          <img src={MyLogo} alt="The Journey Loop logo" className="preloader-logo" />
        </div>

        <div className="preloader-text-wrap">
          <h1 className="preloader-title">The Journey Loop</h1>
          <p className="preloader-sub">Discover. Travel. Experience.</p>
        </div>

        <div className="preloader-ring" aria-hidden="true">
          <span className="ring-dot" />
          <span className="ring-dot" />
          <span className="ring-dot" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
