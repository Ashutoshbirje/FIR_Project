import React from "react";
import "./Advertisement.css";
import logo1 from "../../Images/Logo2.png"; // Adjust path as needed

const Advertisement = () => {
  return (
    <div className="advertisement-container">
      <div className="scrolling-images">
        <img src={logo1} alt="Logo 1" className="ad-image" />
        <img src={logo1} alt="Logo 1" className="ad-image" />
      </div>
    </div>
  );
};

export default Advertisement;
