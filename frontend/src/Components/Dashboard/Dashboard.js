import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import {
  FaGavel,
  FaBell,
  FaUsers,
  FaFileAlt,
  FaMapMarkerAlt,
  FaUserSecret,
} from "react-icons/fa";
import "./Dashboard.css";

// Importing the external components
import FIR from "./Compo/FIR";
// import Section from "./Section";
// import Contact from "./Contact";
import Report from "./Compo/Report";
import AllReport from "./Compo/AllReport";
// import PoliceStation from "./PoliceStation";
// import CyberCrime from "./CyberCrime";

const Dashboard = () => {
  const location = useLocation();
  const [showReport, setShowReport] = useState(false);
  const [formData, setFormData] = useState({
    firNumber: "",
    date: "",
    time: "",
    policeStation: "",
    district: "",
    state: "",
    officerName: "",
    receivedMode: "",
    offenseType: "",
    offenseDateTime: "",
    occurrencePlace: "",
    incidentDescription: "",
    complainantName: "",
    guardianName: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    address: ""
  });

  const items = [
    { icon: <FaBell />, label: "FIR", path: "fir" },
    { icon: <FaGavel />, label: "Section", path: "section" },
    { icon: <FaUsers />, label: "Contact", path: "contact" },
    { icon: <FaFileAlt />, label: "Report", path: "AllReport" },
    { icon: <FaMapMarkerAlt />, label: "Police Station", path: "station" },
    { icon: <FaUserSecret />, label: "Cyber Crime", path: "cyber" },
  ];

  const isBaseDashboard = location.pathname === "/";

  return (
    <div className="container1">
      {isBaseDashboard && (
        <div className="dashboard-container1">
          <div className="dashboard-container">
            {items.map((item, index) => (
              <Link key={index} to={item.path} className="dashboard-item">
                <div className="icon">{item.icon}</div>
                <p className="label">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-content1">
        <Routes>
          <Route
  path="fir"
  element={<FIR showReport={showReport} setShowReport={setShowReport} formData={formData} setFormData={setFormData} />}
/>       
          <Route path="section" element={<AllReport />} />
          <Route path="contact" element={<AllReport />} />
          <Route path="report" 
          element={<Report formData={formData} setFormData={setFormData} />}
          />
          <Route path="AllReport" element={<AllReport />} />
          <Route path="station" element={<AllReport />} />
          <Route path="cyber" element={<AllReport/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
