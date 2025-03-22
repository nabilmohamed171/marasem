"use client";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import "./drop-flags.css";

const countryOptions = [
  { value: "🇪🇬", label: "(+20)", flag: "eg" },
  { value: "🇸🇦", label: "(+966)", flag: "sa" },
  { value: "🇦🇪", label: "(+971)", flag: "ae" },
  { value: "🇱🇧", label: "(+961)", flag: "lb" },
  { value: "🇮🇶", label: "(+964)", flag: "iq" },
];

const PhoneInput = ({ onChange, initialCountryCode = "+20", initialPhone = "" }) => {
  const initialFlag =
    countryOptions.find((c) => c.label.replace(/[()]/g, "") === initialCountryCode) ||
    countryOptions[0];
  const [selectedFlag, setSelectedFlag] = useState(initialFlag);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState(initialCountryCode);

  useEffect(() => {
    setPhoneNumber(initialPhone);
    setCountryCode(initialCountryCode);
  }, [initialPhone, initialCountryCode]);

  const handleSelect = (country) => {
    setSelectedFlag(country);
    const formattedCountryCode = country.label.replace(/[()]/g, "");
    setCountryCode(formattedCountryCode);
    setIsOpen(false);
    if (onChange) onChange({ countryCode: formattedCountryCode, phone: phoneNumber });
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

    if (onChange) onChange({ countryCode, phone: validInput });
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
          <span>{isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</span>
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
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default PhoneInput;
