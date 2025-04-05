import React from 'react';
// import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
// import Login from "./Components/Login/Login";
// import SignUp from "./Components/SignUp/SignUp";
import Instruction from "./Components/Instruction/Instruction"; 
import HomePage from "./Components/HomePage/HomePage";
import Advertisement from "./Components/Advertisement/Advertisement";
import Dashboard from "./Components/Dashboard/Dashboard";
import Footer from "./Components/Footer/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./App.css";

function App() {
  // const [user, setUser] = useState(null);
  return (
    <div className="container">
      <Instruction />
      <div className="sticky-navbar">
        <Navbar />
      </div>
      <HomePage />
      <Advertisement />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
