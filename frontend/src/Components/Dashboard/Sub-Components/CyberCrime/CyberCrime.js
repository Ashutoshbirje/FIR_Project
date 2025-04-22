import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import './CyberCrime.css';

const CyberCrime = () => {
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
      <h1>Cyber Crime Awareness</h1>
      
      <section>
        <h2>What is Cyber Crime?</h2>
        <p>
          Cyber crime refers to any illegal activity carried out using computers or the internet. 
          It ranges from identity theft and hacking to financial fraud and cyberbullying.
        </p>
      </section>

      <section>
        <h2>Types of Cyber Crime</h2>
        <ul>
          <li><strong>Phishing:</strong> Fraudulent attempts to obtain sensitive information by pretending to be a trustworthy entity.</li>
          <li><strong>Hacking:</strong> Unauthorized access to data in a system or computer.</li>
          <li><strong>Identity Theft:</strong> Stealing personal information to impersonate someone else.</li>
          <li><strong>Cyberbullying:</strong> Harassment or bullying using digital platforms.</li>
          <li><strong>Online Scams:</strong> Fraudulent schemes carried out online to steal money or information.</li>
        </ul>
      </section>

      <section>
        <h2>How to Stay Safe Online</h2>
        <ul>
          <li>Use strong, unique passwords for each of your accounts.</li>
          <li>Enable two-factor authentication (2FA) wherever possible.</li>
          <li>Don't click on suspicious links or attachments in emails or messages.</li>
          <li>Regularly update your software and antivirus programs.</li>
          <li>Avoid sharing personal or financial information publicly online.</li>
        </ul>
      </section>

      <section>
        <h2>What to Do if You're a Victim</h2>
        <p>
          If you fall victim to a cybercrime, take the following steps immediately:
        </p>
        <ol>
          <li>Report the incident to the cyber crime cell through the official portal: <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a>.</li>
          <li>Change your passwords and secure your accounts.</li>
          <li>Inform your bank or service provider in case of financial fraud.</li>
          <li>Collect evidence like screenshots, emails, or messages related to the incident.</li>
        </ol>
      </section>

      <section>
        <h2>Need Help?</h2>
        <p>
          You can contact the National Cyber Crime Helpline by dialing <strong>1930</strong> or visit the official 
          cyber crime portal for assistance.
        </p>
      </section>
     </div>
    </div>
  );
};

export default CyberCrime;

