import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import logo from "../../Images/Logo1.jpg";

const LoginSignup = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // <- error message

  const handleLogin = async () => {
    setError(""); // clear old error
    try {
      const response = await axios.post("http://fir-project-10.onrender.com/api/login", {
        username,
        password
      });

      localStorage.setItem("token", response.data.token);
      onLogin(); // Trigger parent login state
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async () => {
    setError("");
    try {
      const response = await axios.post("http://fir-project-10.onrender.com/api/signup", {
        username,
        password
      });

      localStorage.setItem("token", response.data.token);
      onLogin();
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Maharashtra Police Logo" />
        <h2>MAHARASHTRA POLICE</h2>
        <h3>सद्रक्षणाय खलनिग्रहणाय</h3>
      </div>
      <div className="login-right">
        <p className="heading">Please Login to your Account</p>
        <input
          type="text"
          placeholder="User id"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ Display error message here */}
        {error && <p className="error-msg">{error}</p>}

        <button className="login-btn" onClick={handleLogin}>Login</button>
        <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginSignup;
