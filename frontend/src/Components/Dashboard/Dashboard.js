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
import FIR from "./Compo/FIR";
// import Section from "./Section";
// import Contact from "./Contact";
import Report from "./Compo/Report";
import AllReport from "./Compo/AllReport";
// import PoliceStation from "./PoliceStation";
import CyberCrime from "./Compo/CyberCrime";

const Dashboard = () => {
  const location = useLocation();

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
          <Route path="fir" element={<FIR />} />
          <Route path="section" element={<AllReport />} />
          <Route path="contact" element={<AllReport />} />
          <Route path="report" element={<Report />} />
          <Route path="AllReport" element={<AllReport />} />
          <Route path="station" element={<AllReport />} />
          <Route path="cyber" element={<CyberCrime />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
