import React, { useState } from "react";
import "./Instruction.css";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Instruction = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();

  if (!isVisible) return null;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="social-icons">
          <a href="https://www.instagram.com/dgpmaharashtra/?hl=en" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-logo" />
          </a>
          <a href="https://www.facebook.com/dgpmaharashtra/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-logo" />
          </a>
          <a href="https://x.com/DGPMaharashtra" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-logo" />
          </a>
        </div>
        <span className="website"><a href="https://www.mahapolice.gov.in/" target="_blank" rel="noopener noreferrer" className="website">{t("website")}</a></span>
        <span className="emergency">| {t("emergency")} <b>100</b></span>
      </div>

      <div className="topbar-right">
        <div className="dropdown">
          <button className="language-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {t("selectLanguage")}
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <div onClick={() => changeLanguage("en")}>English</div>
              <div onClick={() => changeLanguage("hi")}>हिन्दी</div>
              <div onClick={() => changeLanguage("mr")}>मराठी</div>
            </div>
          )}
        </div>
        <button className="close-button" onClick={() => setIsVisible(false)}>❌</button>
      </div>
    </div>
  );
};

export default Instruction;
