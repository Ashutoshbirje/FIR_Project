import React from "react";
import { FaGavel, FaBell, FaUsers, FaFileAlt, FaMapMarkerAlt, FaUserSecret } from "react-icons/fa";
import "./Dashboard.css"; // Import external CSS

const Dashboard = () => {
  const items = [
    { icon: <FaBell />, label: "FIR" },
    { icon: <FaGavel />, label: "Section" },
    { icon: <FaUsers />, label: "Contact" },
    { icon: <FaFileAlt />, label: "Report" },
    { icon: <FaMapMarkerAlt />, label: "Police Station" },
    { icon: <FaUserSecret />, label: "Cyber Crime" },
  ];

  return (
    <div>
        <div className="container1">
            <div className="dashboard-container">
        {items.map((item, index) => (
        <div key={index} className="dashboard-item">
          <div className="icon">{item.icon}</div>
          <p className="label">{item.label}</p>
        </div>
       ))}
    </div>
        </div>
    </div>

  );
};

export default Dashboard;
