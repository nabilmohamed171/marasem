"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import "./drop-flags.css";

const countryOptions = [
  { value: "🇪🇬", label: "(+20)", flag: "eg" },
  { value: "🇸🇦", label: "(+966)", flag: "sa" },
  { value: "🇦🇪", label: "(+971)", flag: "ae" },
  { value: "🇱🇧", label: "(+961)", flag: "lb" },
  { value: "🇮🇶", label: "(+964)", flag: "iq" },
];

const PhoneInput = ({ onChange }) => {
  const [selectedFlag, setSelectedFlag] = useState(countryOptions[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState("+20");

  const handleSelect = (country) => {
    setSelectedFlag(country);
    setCountryCode(country.label.split(" ")[0]);
    setIsOpen(false);
    if (onChange) onChange(country);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const validInput = input.replace(/[^0-9]/g, "");
    setPhoneNumber(validInput);

    if (validInput.length < 10) {
      setError("Phone number must be at least 10 digits.");
    } else if (validInput.length > 15) {
      setError("Phone number must not exceed 15 digits.");
    } else {
      setError("");
    }

    if (onChange) onChange(validInput);
  };

  const handleBlur = () => {
    if (phoneNumber === "") {
      setError("");
    }
  };

  return (
    <div className="phone-input-container">
      <div className="dropdown-wrapper">
        <div onClick={toggleDropdown} className="dropdown-toggle">
          {selectedFlag ? (
            <span>
              <img
                src={`https://flagcdn.com/24x18/${selectedFlag.flag}.png`}
                alt={selectedFlag.label}
                className="flag-icon"
              />
              {selectedFlag.label}
            </span>
          ) : (
            "Select a country"
          )}
          <span>
            {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </span>
        </div>

        {isOpen && (
          <ul className="dropdown-list">
            {countryOptions.map((country) => (
              <li
                key={country.value}
                onClick={() => handleSelect(country)}
                className="dropdown-item"
              >
                <img
                  src={`https://flagcdn.com/24x18/${country.flag}.png`}
                  alt={country.label}
                  className="flag-icon"
                />
                {country.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        type="tel"
        placeholder="Phone"
        value={phoneNumber}
        onChange={handlePhoneChange}
        onBlur={handleBlur}
        className="phone-input"
      />
      {error && <span className="error">{error}</span>} {""}
    </div>
  );
};

export default PhoneInput;
