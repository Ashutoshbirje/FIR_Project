import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Instruction from "./Components/Instruction/Instruction"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

// import Header from "./Components/Header";
// import ButtonsSection from "./Components/ButtonsSection";
import "./App.css";

function App() {
  return (
    <div class="container">
      <Instruction />
      <Navbar />
      {/* <Header /> */}
      {/* <ButtonsSection /> */}
    </div>
  );
}

export default App;