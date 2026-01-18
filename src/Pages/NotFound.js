// src/pages/NotFound.js
import React from "react";
import "../Styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-11105740-8991397.png" // <-- place your illustration here
          alt="Not Found"
          className="notfound-img"
        />
        <h2 className="notfound-title">Oops! You won't find your spouse here.</h2>
        <p className="notfound-text">Please go back and try again.</p>
        <a href="/" className="btn btn-primary btn-modern w-70" style={{textDecoration:"none",}}>Go Home</a>
      </div>
    </div>
  );
};

export default NotFound;
