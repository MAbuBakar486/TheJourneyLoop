// src/pages/NotFound.js
import React from "react";
import "../Styles/NotFound.css";

const Maintainance = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <img
          src="https://dastweb.me/images/easyblog_articles/154/main_20230815-142254_1.png" // <-- place your illustration here
          alt="Not Found"
          className="notfound-img"
        />
        <h2 className="notfound-title">We are taking time out for Maintainance.</h2>
        <p className="notfound-text">Please go back and try again.</p>
        <p className="notfound-text">Contact Us at <span style={{textDecoration:"underline",color:"#0C3A2E"}}>+923026716764</span></p>
      </div>
    </div>
  );
};

export default Maintainance;