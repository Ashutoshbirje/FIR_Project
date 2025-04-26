import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import logo from "../../Images/Logo1.jpg";

const LoginSignup = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async () => {
    setError("");
    const endpoint = isLoginMode ? "login" : "signup";
    try {
      const response = await axios.post(`${BACKEND_URL}/api/${endpoint}`, {
        username,
        password
      });

      localStorage.setItem("token", response.data.token);
      onLogin();
    } catch (error) {
      setError(error.response?.data?.message || `${isLoginMode ? "Login" : "Signup"} failed`);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Maharashtra Police Logo" />
        <h2>MAHARASHTRA POLICE</h2>
        <h3>सद्रक्षणाय खलनिग्रहणाय</h3>
      </div>
      <div className="login-right">
        <p className="heading">{isLoginMode ? "Please Login to your Account" : "Create a New Account"}</p>
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
        {error && <p className="error-msg">{error}</p>}
        <button className="login-btn" onClick={handleSubmit}>
          {isLoginMode ? "Login" : "Sign Up"}
        </button>
        <p className="toggle-msg">
          {isLoginMode ? (
            <>
              Don’t have an account?{" "}
              <span className="toggle-link" onClick={toggleMode}>Sign up here</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="toggle-link" onClick={toggleMode}>Login here</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
