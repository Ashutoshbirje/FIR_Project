
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";

const FIRReport = () => {
    const location = useLocation();

    const [data, setFormData] = useState({});
  
    useEffect(() => {
      if (location.state && location.state.localData) {
        setFormData(location.state.localData);
        console.log("Received data in Report:", location.state.localData);
      }
    }, [location]);

  const navigate = useNavigate(); 

  const handleNext1 = () => {
    // navigate to FIRReport component with formData
    console.log("At the report",data);
    navigate("/fir", {
        state: {
          showReport: true,
          formData: data
        }
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("First Information Report", 20, 20);
    doc.text(`FIR Number: ${data.firNumber}`, 20, 30);
    doc.text(`Date: ${data.date} | Time: ${data.time}`, 20, 40);

    doc.text("Police Station Details", 20, 50);
    doc.text(`Police Station: ${data.policeStation}`, 20, 60);
    doc.text(`District: ${data.district}`, 20, 70);
    doc.text(`State: ${data.state}`, 20, 80);
    doc.text(`Officer Name: ${data.officerName}`, 20, 90);

    doc.text("Complaint Details", 20, 100);
    doc.text(`Mode of Receiving Info: ${data.receivedMode}`, 20, 110);
    doc.text(`Offense Type: ${data.offenseType}`, 20, 120);
    doc.text(`Offense Date & Time: ${data.offenseDateTime}`, 20, 130);
    doc.text(`Place of Occurrence: ${data.occurrencePlace}`, 20, 140);
    doc.text(`Incident Description: ${data.incidentDescription}`, 20, 150);

    doc.text("Complainant Details", 20, 160);
    doc.text(`Name: ${data.complainantName}`, 20, 170);
    doc.text(`Father/Husband Name: ${data.occurrencePlace}`, 20, 180);
    doc.text(`Age: ${data.age} | Gender: ${data.gender}`, 20, 190);
    doc.text(`Contact: ${data.contact} | Email: ${data.email}`, 20, 200);
    doc.text(`Address: ${data.address}`, 20, 210);

    doc.text("Legal Sections Applied", 20, 220);
    doc.text(`${data.firDraft}`, 20, 210);

    doc.save("FIR_Report.pdf");
  };

  return (
    <div className="fir-report">
      <h2>First Information Report</h2>
      <p><strong>FIR Number:</strong> {data.firNumber}</p>
      <p><strong>Date:</strong> {data.date} | <strong>Time:</strong> {data.time}</p>

      <h3>Police Station Details</h3>
      <p>Police Station: {data.policeStation}</p>
      <p>District: {data.district}</p>
      <p>State: {data.state}</p>
      <p>Officer Name: {data.officerName}</p>

      <h3>Complaint Details</h3>
      <p>Mode of Receiving Info: {data.receivedMode}</p>
      <p>Offense Type: {data.offenseType}</p>
      <p>Offense Date & Time: {data.offenseDateTime}</p>
      <p>Place of Occurrence: {data.occurrencePlace}</p>
      <p>Incident Description: {data.incidentDescription}</p>

      <h3>Complainant Details</h3>
      <p>Name: {data.complainantName}</p>
      <p>Father/Husband Name: {data.guardianName}</p>
      <p>Age: {data.age} | Gender: {data.gender}</p>
      <p>Contact: {data.contact} | Email: {data.email}</p>
      <p>Address: {data.address}</p>

      <h3>Legal Sections Applied</h3>
      <p>{data.firDraft}</p>

      <h3>Signature and Submission</h3>
      <p>Name and Signature of Investigating Officer</p>
      <p>Rank and Badge No.</p>
      <p>Date of submission to Magistrate</p>
      <p>Seal of the Police Station</p>
      
      <div>
        <button className="submit-btn" onClick={handleNext1}>Back</button>
        <button className="submit-btn" onClick={handleNext1}>Submit</button>
        <button className="download-btn" onClick={generatePDF}>Download PDF</button>
      </div>

    </div>
  );
};

export default FIRReport;
