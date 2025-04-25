import React, { useState, useRef} from 'react';
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
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container">
      {
        isLoggedIn ? (
          <>
            <Instruction />
            <div ref={section2Ref}></div>
            <div className="sticky-navbar">
              <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} scrollToSection={scrollToSection} refs={{ section1Ref,section2Ref }} />
            </div>
            <HomePage />
            <Advertisement />
            <div className="Dashboard"ref={section1Ref}><Dashboard/></div>
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
