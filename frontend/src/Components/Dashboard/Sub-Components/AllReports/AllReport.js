import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFileAlt,FaTimesCircle } from "react-icons/fa";
import "./AllReport.css"; // optional for styling

const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
   const navigate = useNavigate();
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/AllReport", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
          },
        });
        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="container4">
           <div className="Close">
        <button
          className="close-btn"
          onClick={() => navigate("/")}
          title="Go back to dashboard"
        >
          <FaTimesCircle size={24} color="#180056" />
        </button>
      </div>
      <h2>FIR-REPORT</h2>
      <div className="report-grid">
        {reports.map((report, index) => (
          <div
            key={report._id}
            className="report-card"
            onClick={() => setSelectedReport(report)}
          >
<div className="file-icon">
  <FaFileAlt size={50} color="#007bff" />
</div>
            <p>FIR-{index + 1}</p>
          </div>
        ))}
      </div>

      {selectedReport && (
        <div className="fir-report">
             <div className="Close">
        <button
          className="close-btn"
          onClick={() => setSelectedReport(null)}
          title="Go back to dashboard"
        >
          <FaTimesCircle size={24} color="red" />
        </button>
      </div>
          <h3 className="fir-report-title">First Information Report</h3>
          <p><strong>FIR Number:</strong> {selectedReport.firNumber}</p>
          <p><strong>Date:</strong> {selectedReport.date} | <strong>Time:</strong> {selectedReport.time}</p>

          <h3>Police Station Details</h3>
          <p><strong>Police Station:</strong> {selectedReport.policeStation}</p>
          <p><strong>District:</strong> {selectedReport.district}</p>
          <p><strong>State:</strong> {selectedReport.state}</p>
          <p><strong>Officer Name:</strong> {selectedReport.officerName}</p>

          <h3>Complaint Details</h3>
          <p><strong>Mode of Receiving Info:</strong> {selectedReport.receivedMode}</p>
          <p><strong>Offense Type:</strong> {selectedReport.offenseType}</p>
          <p><strong>Offense Date & Time:</strong> {selectedReport.offenseDateTime}</p>
          <p><strong>Place of Occurrence:</strong> {selectedReport.occurrencePlace}</p>
          <p><strong>Incident Description:</strong> {selectedReport.incidentDescription}</p>

          <h3>Complainant Details</h3>
          <p><strong>Name:</strong> {selectedReport.complainantName}</p>
          <p><strong>Father/Husband Name:</strong> {selectedReport.guardianName}</p>
          <p><strong>Age:</strong> {selectedReport.age} <strong>Gender:</strong> {selectedReport.gender}</p>
          <p><strong>Contact:</strong> {selectedReport.contact}</p>
          <p><strong>Email:</strong> {selectedReport.email}</p>
          <p><strong>Address:</strong> {selectedReport.address}</p>

          <h3>Legal Sections Applied</h3>
          <p>{selectedReport.firDraft}</p>

          <h3>Signature and Submission</h3>
          <p><strong>Name and Signature of Investigating Officer</strong></p>
          <p><strong>Rank and Badge No.</strong></p>
          <p><strong>Date of submission to Magistrate</strong></p>
          <p><strong>Seal of the Police Station</strong></p>
        </div>
      )}
    </div>
  );
};

export default AllReports;

