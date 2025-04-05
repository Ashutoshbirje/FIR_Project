import React from "react";
import "./Navbar.css";
import logo from "../../Images/Logo1.jpg"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {  

  return (
    <div>
      <nav className="navbar">
        <div className="navbar1">
          <div className="navbar-left">
            <div className="logo">
              <img src={logo} alt="ArogyaSathi Logo" />
              <div className="Inner">
              <h1 className="no-margin">MAHARASHTRA POLICE</h1>
              <h4 className="no-margin">सद्रक्षणाय खलनिग्रहणाय</h4>
              </div>
            </div>
            <ul className="navbar-menu">
              <li className="navbar-item">Home</li>
              <li className="navbar-item">Police Stations</li>
              <li className="navbar-item">FIR Report</li>
              <li className="navbar-item dropdown">Section</li>
              <li className="navbar-item">Contact</li>
            </ul>
          </div>

          <div className="navbar-right">
    
              <button className="login-btn">Login</button>
      
              <button className="signup-btn">Sign Up</button>
        
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
