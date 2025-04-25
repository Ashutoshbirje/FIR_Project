import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import './Contact.css';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="container3">
      <div className="Close">
        <button
          className="close-btn"
          onClick={() => navigate("/")}
          title="Go back to dashboard"
        >
          <FaTimesCircle size={24} color="#180056" />
        </button>
      </div>

      <div className="container2">
        <h1>Emergency Contacts</h1>
        
        <section>
          <h2>General Emergency Numbers</h2>
          <ul>
            <li><strong>Police:</strong> 100</li>
            <li><strong>Ambulance:</strong> 102 / 108</li>
            <li><strong>Fire Department:</strong> 101</li>
            <li><strong>Disaster Management Services:</strong> 108</li>
          </ul>
        </section>

        <section>
          <h2>Specialized Helplines</h2>
          <ul>
            <li><strong>Cyber Crime Helpline:</strong> 1930</li>
            <li><strong>Women’s Helpline:</strong> 1091</li>
            <li><strong>Child Helpline:</strong> 1098</li>
            <li><strong>Senior Citizens Helpline:</strong> 14567</li>
            <li><strong>Anti-Ragging Helpline:</strong> 1800-180-5522</li>
          </ul>
        </section>

        <section>
          <h2>Online Support</h2>
          <p>
            You can also reach out via official portals:
          </p>
          <ul>
            <li>
              <strong>Cyber Crime Portal:</strong>{" "}
              <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
                cybercrime.gov.in
              </a>
            </li>
            <li>
              <strong>National Police Portal:</strong>{" "}
              <a href="https://digitalpolice.gov.in" target="_blank" rel="noopener noreferrer">
                digitalpolice.gov.in
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2>Local Police Station</h2>
          <p>
            For non-emergency issues or queries, contact your nearest police station. You can locate your police station using the <a href="https://digitalpolice.gov.in" target="_blank" rel="noopener noreferrer">National Police Portal</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact;
