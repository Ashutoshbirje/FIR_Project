import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../Images/Logo1.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
 
  const handleLogout = () => {
    setIsLoggedIn(false); // Update login state on logout
  };


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar1">
          <div className="navbar-left">
            <div className="logo">
              <img src={logo} alt="ArogyaSathi Logo" className="logo-img" />
              <div className="Inner">
                <h1 className="no-margin">MAHARASHTRA POLICE</h1>
                <h4 className="no-margin">सद्रक्षणाय खलनिग्रहणाय</h4>
              </div>
            </div>
          </div>
          <div className="navbar-right">
            <ul className="navbar-menu">
              <li className="navbar-item">Home</li>
              <li className="navbar-item">Police Stations</li>
              <li className="navbar-item">FIR Report</li>
              <li className="navbar-item">Section</li>
              <li className="navbar-item">Contact</li>
            </ul>

            <div className="hamburger" onClick={toggleMenu}>
              <i className="icon1 fas fa-bars"></i>
            </div>
            {isLoggedIn && (
            <button className="logout-btn" onClick={handleLogout}>Log Out</button>)}
          </div>
        </div>
      </nav>
      {menuOpen && (
      <div className={`hamburger-menu-container ${menuOpen ? "active" : ""}`}>
       <ul className="hamburger-menu">
         <li className="navbar-item">Home</li>
         <li className="navbar-item">Police Stations</li>
         <li className="navbar-item">FIR Report</li>
         <li className="navbar-item">Section</li>
         <li className="navbar-item">Contact</li>
       </ul>
      </div>
      )}
    </div>
  );

};

export default Navbar;
