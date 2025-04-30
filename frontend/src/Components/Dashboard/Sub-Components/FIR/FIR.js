import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTimesCircle } from "react-icons/fa";
import "./FIR.css";

const FIR = () => {
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
    address: "",
    firDraft: "",
  });
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const navigate = useNavigate();

  // Handle form submission to send the FIR data to the backend
  const handleSubmit = async () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await axios.post(`${BACKEND_URL}/api/fir-ai`, { input });
      setOutput(response.data.output);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setOutput("Error occurred!");
    }
  };

  // Fetch existing FIRs and set the FIR number
  useEffect(() => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const fetchFIRs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/AllReport`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const firs = response.data; // Assuming response is an array of FIRs
        const nextFIRNumber = firs.length + 1;
        setFormData((prev) => ({
          ...prev,
          firNumber: `FIR - ${nextFIRNumber}`,
        }));
      } catch (error) {
        console.error("Error fetching FIRs:", error);
      }
    };
    fetchFIRs();
  }, []);

  // Set the current date and time
  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5); // Format: HH:MM

    setFormData((prev) => ({
      ...prev,
      date: currentDate,
      time: currentTime,
    }));
  }, []);

  // Update form data when output is generated
  useEffect(() => {
    if (output) {
      console.log("Generated Output:", output);
      const updatedData = { ...formData, firDraft: output };
      setFormData(updatedData);
    }
  }, [output]);

  // Update input based on the incident description
  useEffect(() => {
    setInput(formData.incidentDescription);
  }, [formData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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

  const [showButton, setShowButton] = useState(false);
  // Voice Recognition State
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null); // Ref to store the recognition instance
  // Start voice recognition
  const startListening = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = true; // allow continuous recognition

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setFormData((prev) => ({
          ...prev,
          incidentDescription: transcript,
        }));
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start(); // auto-restart if still listening
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // This triggers onend, but isListening is false now
      setIsListening(false);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  const handleNext1 = () => {
    navigate("/report", {
      state: {
        localData: formData, // formData should be the full form object
      },
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
          <FaTimesCircle size={24} color="#180056" />
        </button>
      </div>

      {showReport ? (
        <div className="Report">
          <div className="fir-report1">
            <h3 className="fir-report-title">First Information Report</h3>
            <p>
              <strong>FIR Number:</strong> {formData.firNumber}
            </p>
            <p>
              <strong>Date:</strong> {formData.date}
            </p>
            <p>
              <strong>Time:</strong> {formData.time}
            </p>

            <h3>Police Station Details</h3>
            <p>
              <strong>Police Station:</strong> {formData.policeStation}
            </p>
            <p>
              <strong>District:</strong> {formData.district}
            </p>
            <p>
              <strong>State:</strong> {formData.state}
            </p>
            <p>
              <strong>Officer Name:</strong> {formData.officerName}
            </p>

            <h3>Complaint Details</h3>
            <p>
              <strong>Mode of Receiving Info:</strong> {formData.receivedMode}
            </p>
            <p>
              <strong>Offense Type:</strong> {formData.offenseType}
            </p>
            <p>
              <strong>Offense Date & Time:</strong> {formData.offenseDateTime}
            </p>
            <p>
              <strong>Place of Occurrence:</strong> {formData.occurrencePlace}
            </p>
            <p>
              <strong>Incident Description:</strong>{" "}
              {formData.incidentDescription}
            </p>

            <h3>Complainant Details</h3>
            <p>
              <strong>Name:</strong> {formData.complainantName}
            </p>
            <p>
              <strong>Father/Husband Name:</strong> {formData.guardianName}
            </p>
            <p>
              <strong>Age:</strong> {formData.age} | <strong>Gender:</strong>{" "}
              {formData.gender}
            </p>
            <p>
              <strong>Contact:</strong> {formData.contact}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Address:</strong> {formData.address}
            </p>
          </div>

          <div className="text-center1">
            <button className="submit-btn" onClick={handleEdit}>
              Edit FIR
            </button>
            {showButton ? (
              <button className="submit-btn" onClick={handleNext1}>
                Next
              </button>
            ) : (
              <button className="submit-btn">Loading ...</button>
            )}
          </div>
        </div>
      ) : (
        <>
          <h2 className="fir-title">FIR FORM</h2>
          <form onSubmit={handleNext}>
            <div className="form-section">
              <div className="input-group">
                <label className="input-label-desktop">FIR Number</label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="firNumber"
                  value={formData.firNumber}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Date</label>
                <input
                  className="input-field-desktop"
                  type="date"
                  name="date"
                  value={formData.date}
                  readOnly
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Time</label>
                <input
                  className="input-field-desktop"
                  type="time"
                  name="time"
                  value={formData.time}
                  readOnly
                />
              </div>
            </div>

            <h3 className="section-heading">Police Station Details</h3>
            <div className="form-section">
              <div className="input-group">
                <label className="input-label-desktop">Police Station</label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="policeStation"
                  value={formData.policeStation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">District</label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">State</label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Officer Name</label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="officerName"
                  value={formData.officerName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <h3 className="section-heading">Complainant Details</h3>
            <div className="form-section">
              <div className="input-group">
                <label className="input-label-desktop">
                  Mode of Receiving Info
                </label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="receivedMode"
                  value={formData.receivedMode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Offense Type</label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="offenseType"
                  value={formData.offenseType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">
                  Offense Date & Time
                </label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="offenseDateTime"
                  value={formData.offenseDateTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">
                  Place of Occurrence
                </label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="occurrencePlace"
                  value={formData.occurrencePlace}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group Detail">
              <label className="input-label-desktop">
                Detailed Incident Description
              </label>
              <textarea
                className="input-field-desktop"
                name="incidentDescription"
                value={formData.incidentDescription}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="button"
              className={`voice-input-btn ${isListening ? "listening" : ""}`}
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? "Stop Voice" : "Start Voice "}
            </button>
            <h3 className="section-heading">Complainant Personal Details</h3>
            <div className="form-section">
              <div className="input-group">
                <label className="input-label-desktop">Name</label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="complainantName"
                  value={formData.complainantName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">
                  Father/Husband Name
                </label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Age</label>
                <input
                  className="input-field-desktop"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Gender</label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <div className="input-group">
                <label className="input-label-desktop">Contact</label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Email</label>
                <input
                  className="input-field-desktop"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label-desktop">Address</label>
                <input
                  className="input-field-desktop"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="submit-btn"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default FIR;
