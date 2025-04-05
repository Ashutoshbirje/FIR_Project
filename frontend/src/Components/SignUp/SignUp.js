import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import './SignUp.css';
import axios from "axios"
import { useGoogleLogin } from '@react-oauth/google';

const SignUp = ({ setUser }) => {
  const [name, setName] = useState(''); // Changed from firstName to name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); // Hook to navigate programmatically
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sign Up Details:', { name, email, password }); // Updated log to include name
    // Simulate successful sign-up (for example purposes)
    setUser({ name, email });
    navigate('/'); // Redirect to login after signup

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const res = await axios.post(`http://localhost:5000/api/v1/user/register`, {name, email, password}, config)
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="form-group">
          <label htmlFor="name">Name *</label> {/* Changed from First Name to Name */}
          <input
            type="text"
            id="name"
            placeholder="Sarthak Mahadik"
            value={name}
            onChange={(e) => setName(e.target.value)} // Updated state management
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

        <button type="submit" className="btn-primary">Sign Up</button>

        <div className="divider">OR</div>

        <button type="button" className="btn-secondary" onClick={() => login()}>Continue with Google</button>

        <p className="sign-up-text">
          Already have an account? <Link to="/login">Login</Link> {/* Navigate to login page */}
        </p>
      </form>
    </div>
  );
};

export default SignUp;