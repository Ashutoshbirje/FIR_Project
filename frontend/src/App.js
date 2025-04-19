import React, { useState } from 'react';
import Navbar from "./Components/Navbar/Navbar";
import Instruction from "./Components/Instruction/Instruction"; 
import HomePage from "./Components/HomePage/HomePage";
import Advertisement from "./Components/Advertisement/Advertisement";
import Dashboard from "./Components/Dashboard/Dashboard";
import Footer from "./Components/Footer/Footer";
import LoginSignup from "./Components/LoginSignup/LoginSignup"; // New component
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // login state

  return (
    <div className="container">
      {
        isLoggedIn ? (
          <>
            <Instruction />
            <div className="sticky-navbar">
              <Navbar />
            </div>
            <HomePage />
            <Advertisement />
            <Dashboard />
            <Footer />
          </>
        ) : (
          <LoginSignup onLogin={() => setIsLoggedIn(true)} />
        )
      }
    </div>
  );
}

export default App;
