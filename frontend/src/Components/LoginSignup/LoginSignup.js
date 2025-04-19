import React from 'react';
import './LoginSignup.css'; // style it similar to your screenshot
import logo from "../../Images/Logo1.jpg";

const LoginSignup = ({ onLogin }) => {
  const handleLogin = () => {
    // Here, validate credentials if needed
    onLogin(); // trigger login state change
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Maharashtra Police Logo" />
        <h2>MAHARASHTRA POLICE</h2>
        <h3>सद्रक्षणाय खलनिग्रहणाय</h3>
      </div>
      <div className="login-right">
        <p>Please Login to your Account</p>
        <input type="text" placeholder="User id" />
        <input type="password" placeholder="Password" />
        <button className="login-btn" onClick={handleLogin}>Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </div>
  );
};

export default LoginSignup;
