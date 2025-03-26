"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import PhoneInput from "@/components/dropFlags/DropFlags";
import Link from "next/link";
import "./pickup-location.css";

const PickupLocation = ({ onClose }) => {
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [cities, setCities] = useState([]);

  const handleCityChange = (event) => setCity(event.target.value);
  const handleZoneChange = (event) => setZone(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleAddressDetailsChange = (event) => setAddressDetails(event.target.value);

  const handlePhoneNumberChange = (data) => {
    setPhoneNumber(data.phone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isDefault = document.getElementById("saveAddress").checked;
    if (city && zone && addressDetails) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
          "http://127.0.0.1:8000/api/add-address",
          {
            city,
            zone,
            address: addressDetails,
            name,
            phone: phoneNumber,
            country_code: "+20", // hard-coded or you could add a field for it
            is_default: isDefault,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        console.log("Address saved:", response.data);
        setIsSaved(true);
        if (onClose && typeof onClose === "function") {
          onClose(response.data.id);
        }
      } catch (error) {
        console.error("Error saving address:", error);
      }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get-cities", {
          params: { country: "Egypt" },
          withCredentials: true,
        });
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="add-first-address">
      <div className="first-address">
        <span className="close" onClick={handleClose}>
          <IoMdClose />
        </span>
        <h2>Add Your First Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* City Dropdown */}
            <div className="col-md-6 col-6">
              <div className="form-group">
                <label htmlFor="city">
                  <span className="main-color">* </span>City
                </label>
                <select
                  id="city"
                  className="form-control user-city"
                  value={city}
                  onChange={handleCityChange}
                  required
                >
                  <option value="" disabled>
                    Select your city
                  </option>
                  {cities.map((cityOption, index) => (
                    <option key={index} value={cityOption}>
                      {cityOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Zone as Text Input */}
            <div className="col-md-6 col-6">
              <div className="form-group">
                <label htmlFor="zone">
                  <span className="main-color">* </span>Zone
                </label>
                <input
                  type="text"
                  id="zone"
                  className="form-control"
                  placeholder="Enter your zone"
                  value={zone}
                  onChange={handleZoneChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            {/* Address Details */}
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="addressDetails">
                  <span className="main-color">* </span>Address Details
                </label>
                <textarea
                  id="addressDetails"
                  className="form-control"
                  placeholder="Enter your full address here"
                  value={addressDetails}
                  onChange={handleAddressDetailsChange}
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <h2>Personal Info</h2>
          <div className="row">
            {/* Name Field */}
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="name">
                  <span className="main-color">* </span>Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
            </div>
            {/* Phone Number using PhoneInput */}
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="phoneNumber">
                  <span className="main-color">* </span>Phone Number
                </label>
                <PhoneInput onChange={handlePhoneNumberChange} />
              </div>
            </div>
          </div>

          <div className="check-button">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="form-check default-address">
                  <input
                    type="checkbox"
                    id="saveAddress"
                    className="form-check-input"
                  />
                  <label htmlFor="saveAddress" className="form-check-label">
                    Set as default address
                  </label>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="save-address-button">
                  <button type="submit" className="btn">
                    Save Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {isSaved && (
          <div className="alert alert-success mt-3">
            Address saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupLocation;
