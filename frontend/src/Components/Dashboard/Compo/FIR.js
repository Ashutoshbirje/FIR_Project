import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FIR.css";

const FIR = ({ showReport, setShowReport,formData, setFormData }) => {
  const [localData, setLocalData] = useState(formData || {}); // initialize with formData
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/fir", { input });
      setOutput(response.data.output);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setOutput("Error occurred!");
    }
  };

  useEffect(() => {
    if (output) {
      console.log("Generated Output:", output);
      const updatedData = { ...localData, firDraft: output };
      setLocalData(updatedData);
      setFormData(updatedData);
    }
  }, [output]);

  useEffect(() => {
    console.log("Local Data:",formData);
    setInput(formData.incidentDescription);
    setLocalData(formData)
  }, [formData]); 

  useEffect(() => {
    console.log("Local Data:",localData);
  }, [localData]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setShowReport(true);
    console.log("FIR Verification:", formData);
  };

  const handleEdit = () => {
    setShowReport(false);
  };

  const handleNext1 = () => {
    // navigate to FIRReport component with formData
    // console.log(formData);
      navigate("/report", {
        state: {
          localData: formData // formData should be the full form object
        }
      });
      
  };

  
  return (
    <div className="fir-container">
      <div className="Close">
        <button
          className="close-btn"
          onClick={() => navigate("/")}
          title="Go back to dashboard"
        >
          ❌
        </button>
      </div>

      {showReport ? (
        <div className="Report">
          <div className="fir-report">
            <h2 className="fir-report-title">First Information Report</h2>
            <p><strong>FIR Number:</strong> {formData.firNumber}</p>
            <p><strong>Date:</strong> {formData.date} | <strong>Time:</strong> {formData.time}</p>

            <h3>Police Station Details</h3>
            <p><strong>Police Station:</strong> {formData.policeStation}</p>
            <p><strong>District:</strong> {formData.district}</p>
            <p><strong>State:</strong> {formData.state}</p>
            <p><strong>Officer Name:</strong> {formData.officerName}</p>

            <h3>Complaint Details</h3>
            <p><strong>Mode of Receiving Info:</strong> {formData.receivedMode}</p>
            <p><strong>Offense Type:</strong> {formData.offenseType}</p>
            <p><strong>Offense Date & Time:</strong> {formData.offenseDateTime}</p>
            <p><strong>Place of Occurrence:</strong> {formData.occurrencePlace}</p>
            <p><strong>Incident Description:</strong> {formData.incidentDescription}</p>

            <h3>Complainant Details</h3>
            <p><strong>Name:</strong> {formData.complainantName}</p>
            <p><strong>Father/Husband Name:</strong> {formData.guardianName}</p>
            <p><strong>Age:</strong> {formData.age} | <strong>Gender:</strong> {formData.gender}</p>
            <p><strong>Contact:</strong> {formData.contact} | <strong>Email:</strong> {formData.email}</p>
            <p><strong>Address:</strong> {formData.address}</p>
          </div>

          <div className="text-center1">
            <button className="submit-btn" onClick={handleEdit}>Edit FIR</button>
            <button className="submit-btn" onClick={handleNext1}>Next</button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="fir-title">FIR FORM</h2>
          <form onSubmit={handleNext}>
            <div className="form-section">
              <div className="input-group">
                <label className="input-label-desktop">FIR Number</label>
                <input className="input-field-desktop" type="text" name="firNumber" value={formData.firNumber} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Date</label>
                <input className="input-field-desktop" type="date" name="date" value={formData.date} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Time</label>
                <input className="input-field-desktop" type="time" name="time" value={formData.time} onChange={handleChange} required/>
              </div>
            </div>

            <h3 className="section-heading">Police Station Details</h3>
            <div className="form-section">
              <div className="input-group">
                <label className="input-label-desktop">Police Station</label>
                <input className="input-field-desktop" type="text" name="policeStation" value={formData.policeStation} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">District</label>
                <input className="input-field-desktop" type="text" name="district" value={formData.district} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">State</label>
                <input className="input-field-desktop" type="text" name="state" value={formData.state} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Officer Name</label>
                <input className="input-field-desktop" type="text" name="officerName" value={formData.officerName} onChange={handleChange} required/>
              </div>
            </div>

            <h3 className="section-heading">Complainant Details</h3>
            <div className="form-section">
              <div className="input-group">
                <label className="input-label-desktop">Mode of Receiving Info</label>
                <input className="input-field-desktop" type="text" name="receivedMode" value={formData.receivedMode} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Offense Type</label>
                <input className="input-field-desktop" type="text" name="offenseType" value={formData.offenseType} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Offense Date & Time</label>
                <input className="input-field-desktop" type="text" name="offenseDateTime" value={formData.offenseDateTime} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Place of Occurrence</label>
                <input className="input-field-desktop" type="text" name="occurrencePlace" value={formData.occurrencePlace} onChange={handleChange} required/>
              </div>
            </div>

            <div className="input-group Detail">
              <label className="input-label-desktop">Detailed Incident Description</label>
              <textarea className="textarea-field" name="incidentDescription" value={formData.incidentDescription} onChange={handleChange} required></textarea>
            </div>

            <h3 className="section-heading">Complainant Details</h3>
            <div className="form-section">
              <div className="input-group">
                <label className="input-label-desktop">Complainant Name</label>
                <input className="input-field-desktop" type="text" name="complainantName" value={formData.complainantName} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Father/Husband Name</label>
                <input className="input-field-desktop" type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Age</label>
                <input className="input-field-desktop" type="text" name="age" value={formData.age} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Gender</label>
                <input className="input-field-desktop" type="text" name="gender" value={formData.gender} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Contact Number</label>
                <input className="input-field-desktop" type="text" name="contact" value={formData.contact} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Email Address</label>
                <input className="input-field-desktop" type="email" name="email" value={formData.email} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Address</label>
                <input className="input-field-desktop" type="text" name="address" value={formData.address} onChange={handleChange} required/>
              </div>
            </div>

            <div className="text-center">
              <button onClick={handleSubmit}>Submit</button>
              {/* <button type="submit" className="submit-btn">Next</button> */}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default FIR;
