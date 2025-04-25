import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaTimesCircle } from "react-icons/fa";
import "./AllReport.css";

const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const printRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("https://fir-project-10.onrender.com/api/AllReport", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      }
    };

    fetchReports();
  }, []);

  const handlePrint = () => {
    const doc = new jsPDF();
    const lineHeight = 8;
    let y = 20;
  
    const addMainTitle = (text) => {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = doc.getTextWidth(text);
      const x = (pageWidth - textWidth) / 2;
      doc.text(text, x, y);
      y += 5;
      doc.setLineWidth(0.5);
      doc.line(20, y, pageWidth - 20, y);
      y += lineHeight;
    };
  
    const addTitle = (text) => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(text, 20, y);
      y += 3;
      doc.setLineWidth(0.3);
      doc.line(20, y, 190, y);
      y += lineHeight;
    };
  
    const addText = (label, value) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`${label} ${value || ''}`, 20, y);
      y += lineHeight;
    };
  
    const addMultilineText = (label, value, maxWidth = 170) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const labelWidth = doc.getTextWidth(label + " ");
      const lines = doc.splitTextToSize(value || '', maxWidth - labelWidth);
      const firstLine = `${label} ${lines[0]}`;
      doc.text(firstLine, 20, y, { align: 'justify', maxWidth });
      y += lineHeight;
      for (let i = 1; i < lines.length; i++) {
        doc.text(lines[i], 20, y, { align: 'justify', maxWidth });
        y += lineHeight;
      }
    };
  
    addMainTitle("First Information Report");
    doc.setFontSize(12);
    doc.text(`FIR Number: ${selectedReport.firNumber}`, 20, y);
    doc.text(`Date: ${selectedReport.date} | Time: ${selectedReport.time}`, 130, y);
    y += lineHeight;
  
    addTitle("Police Station Details");
    addText("Police Station:", selectedReport.policeStation);
    addText("District:", selectedReport.district);
    addText("State:", selectedReport.state);
    addText("Officer Name:", selectedReport.officerName);
  
    addTitle("Complaint Details");
    addText("Mode of Receiving Info:", selectedReport.receivedMode);
    addText("Offense Type:", selectedReport.offenseType);
    addText("Offense Date & Time:", selectedReport.offenseDateTime);
    addText("Place of Occurrence:", selectedReport.occurrencePlace);
    addMultilineText("Incident Description:", selectedReport.incidentDescription);
  
    addTitle("Complainant Details");
    addText("Name:", selectedReport.complainantName);
    addText("Father/Husband Name:", selectedReport.guardianName);
    doc.text(`Age: ${selectedReport.age || ''}  Gender: ${selectedReport.gender || ''}  Contact: ${selectedReport.contact || ''}`, 20, y);
    y += lineHeight;
    addText("Email:", selectedReport.email);
    addMultilineText("Address:", selectedReport.address);
  
    addTitle("Legal Sections Applied");
    addMultilineText("", selectedReport.firDraft || "None specified");
  
    addTitle("Signature and Submission");
    addText("Name and Signature of Investigating Officer:", "____________________");
    addText("Rank and Badge No.:", "____________________");
    addText("Date of submission to Magistrate:", "____________________");
    addText("Seal of the Police Station:", "____________________");
  
    // 👉 Open PDF in new tab and auto-trigger browser print
    const pdfBlobUrl = doc.output('bloburl');
    const printWindow = window.open(pdfBlobUrl, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    }
    
  };
  
  const generatePDF = () => {
    const doc = new jsPDF();
    const lineHeight = 8;
    let y = 20;

    const addMainTitle = (text) => {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = doc.getTextWidth(text);
      const x = (pageWidth - textWidth) / 2;
      doc.text(text, x, y);
      y += 5;
      doc.setLineWidth(0.5);
      doc.line(20, y, pageWidth - 20, y);
      y += lineHeight;
    };

    const addTitle = (text) => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(text, 20, y);
      y += 3;
      doc.setLineWidth(0.3);
      doc.line(20, y, 190, y);
      y += lineHeight;
    };

    const addText = (label, value) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`${label} ${value || ''}`, 20, y);
      y += lineHeight;
    };

    const addMultilineText = (label, value, maxWidth = 170) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const labelWidth = doc.getTextWidth(label + " ");
      const lines = doc.splitTextToSize(value || '', maxWidth - labelWidth);
      const firstLine = `${label} ${lines[0]}`;
      doc.text(firstLine, 20, y, { align: 'justify', maxWidth });
      y += lineHeight;
      for (let i = 1; i < lines.length; i++) {
        doc.text(lines[i], 20, y, { align: 'justify', maxWidth });
        y += lineHeight;
      }
    };

    addMainTitle("First Information Report");
    doc.setFontSize(12);
    doc.text(`FIR Number: ${selectedReport.firNumber}`, 20, y);
    doc.text(`Date: ${selectedReport.date} | Time: ${selectedReport.time}`, 130, y);
    y += lineHeight;

    addTitle("Police Station Details");
    addText("Police Station:", selectedReport.policeStation);
    addText("District:", selectedReport.district);
    addText("State:", selectedReport.state);
    addText("Officer Name:", selectedReport.officerName);

    addTitle("Complaint Details");
    addText("Mode of Receiving Info:", selectedReport.receivedMode);
    addText("Offense Type:", selectedReport.offenseType);
    addText("Offense Date & Time:", selectedReport.offenseDateTime);
    addText("Place of Occurrence:", selectedReport.occurrencePlace);
    addMultilineText("Incident Description:", selectedReport.incidentDescription);

    addTitle("Complainant Details");
    addText("Name:", selectedReport.complainantName);
    addText("Father/Husband Name:", selectedReport.guardianName);
    doc.text(`Age: ${selectedReport.age || ''}  Gender: ${selectedReport.gender || ''}  Contact: ${selectedReport.contact || ''}`, 20, y);
    y += lineHeight;
    addText("Email:", selectedReport.email);
    addMultilineText("Address:", selectedReport.address);

    addTitle("Legal Sections Applied");
    addMultilineText("", selectedReport.firDraft || "None specified");

    addTitle("Signature and Submission");
    addText("Name and Signature of Investigating Officer:", "____________________");
    addText("Rank and Badge No.:", "____________________");
    addText("Date of submission to Magistrate:", "____________________");
    addText("Seal of the Police Station:", "____________________");

    doc.save("FIR_Report.pdf");
  };

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
        <div className="fir-report" ref={printRef}>
          <div className="Close">
            <button
              className="close-btn"
              onClick={() => setSelectedReport(null)}
              title="Close"
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

          <div className="text-center2">
            <button className="submit-btn" onClick={handlePrint}>
              Print
            </button>
            <button className="submit-btn" onClick={generatePDF}>
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReports;
