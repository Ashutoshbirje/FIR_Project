import React, { useState } from "react";
import { sectionInfo } from "./sectionData"; // Adjust the path as necessary
import logo1 from "../../../../Images/Logo3.png";
import logo2 from "../../../../Images/Logo4.png";
import "./Section.css";

const sectionList = Array.from({ length: 575 }, (_, i) => {
  if ([29, 52].includes(i + 1)) return [`Section ${i + 1}`, `Section ${i + 1}A`];
  return `Section ${i + 1}`;
}).flat();

const Sections = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="container5">
      {/* 🟫 Header Box */}
      <div className="header-box">
        <div className="header-box-left">
          <img src={logo1} alt="Emblem" className="ashoka-logo" />
          <div className="Title">
            <h2>All Sections List</h2>
            <p>IPC 1860, India</p>
          </div>
        </div>
        <img src={logo2} alt="India Flag" className="flag-img" />
      </div>

      <hr />

      {!selectedSection ? (
        <div className="sections-grid">
          {sectionList.map((sec, index) => (
            <span
              key={index}
              className="section-link"
              onClick={() => setSelectedSection(sec)}
            >
              {sec}
            </span>
          ))}
        </div>
      ) : (
        <div className="section-info">
          <button className="back-btn" onClick={() => setSelectedSection(null)}>
            ← Back to List
          </button>
          <h2>{selectedSection}</h2>
          <p>{sectionInfo[selectedSection] || "Info not available for this section."}</p>
        </div>
      )}
    </div>
  );
};

export default Sections;
