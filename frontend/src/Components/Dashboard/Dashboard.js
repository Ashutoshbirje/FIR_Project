import React from "react";
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
import FIR from "./Sub-Components/FIR/FIR";
import Section from "./Sub-Components/Section/Section";
import Contact from "./Sub-Components/Contact/Contact";
import Report from "./Sub-Components/Report/Report";
import AllReport from "./Sub-Components/AllReports/AllReport";
import CyberCrime from "./Sub-Components/CyberCrime/CyberCrime";
import PoliceStation from "./Sub-Components/PoliceStation/PoliceStation"
const Dashboard = () => {
  const location = useLocation();

  const items = [
    { icon: <FaBell />, label: "FIR", path: "fir" },
    { icon: <FaFileAlt />, label: "Report", path: "AllReport" },
    { icon: <FaGavel />, label: "Section", path: "section" },
    { icon: <FaUsers />, label: "Contact", path: "contact" },
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
          <Route path="fir" element={<FIR />} />
          <Route path="section" element={<Section />} />
          <Route path="contact" element={<Contact />} />
          <Route path="report" element={<Report />} />
          <Route path="AllReport" element={<AllReport />} />
          <Route path="station" element={<PoliceStation />} />
          <Route path="cyber" element={<CyberCrime />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
