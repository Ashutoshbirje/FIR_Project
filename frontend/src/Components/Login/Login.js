import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Login.css';
import axios from 'axios';
import Cookies from "js-cookie";
import { useGoogleLogin } from '@react-oauth/google';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google token:', tokenResponse);

      try {
        // Fetch user data with access token
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const userData = res.data;
        console.log('User data from Google:', userData);

        // Set user data to state or pass to parent component
        setUser(userData);

        // Save user data in localStorage if required
        localStorage.setItem('user', JSON.stringify(userData));

        // Navigate to home page after login
        navigate('/');
      } catch (error) {
        console.error('Error fetching Google user data:', error);
      }
    },
    onError: () => alert("Google Login failed. Please try again."),
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      navigate('/');
    }
  }, [setUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password, "Username:", username);

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/user/login`, 
        { email, password, username }, 
        config
      );
      
      setUser(res.data.data);
      Cookies.set('refreshToken', res.data.data.refreshToken, { expires: 7 });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert('Invalid user credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log in</h2>
        <div className="form-group">
          <label htmlFor="username">Name *</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Sarthak Mahadik" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-Mail Address *</label>
          <input 
            type="email" 
            id="email" 
            placeholder="name@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="btn-primary">Login</button>

        <div className="divider">OR</div>

        <button type="button" className="btn-secondary" onClick={() => login()}>Continue with Google</button>

        <p className="sign-up-text">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;