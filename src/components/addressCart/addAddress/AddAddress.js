import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import PhoneInput from "@/components/dropFlags/DropFlags";
import "./pickup-location.css";

const PickupLocation = () => {
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleCityChange = (event) => setCity(event.target.value);
  const handleZoneChange = (event) => setZone(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleAddressDetailsChange = (event) =>
    setAddressDetails(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const isCheckboxChecked = document.getElementById("saveAddress").checked;
    if (
      city &&
      zone &&
      name &&
      phoneNumber &&
      addressDetails &&
      isCheckboxChecked
    ) {
      setIsSaved(true);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const handlePhoneChange = (phoneData) => {
    setPhoneNumber(phoneData.phoneNumber);
  };

  return (
    <div className="add-first-address">
      <div className="first-address">
        <span className="close" onClick={handleClose}>
          <IoClose />
        </span>
        <h2>Add Your First Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
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
                  <option value="">Select City</option>
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
                  <option value="city3">City 3</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 col-6">
              <div className="form-group">
                <label htmlFor="zone">
                  <span className="main-color">* </span>Zone
                </label>
                <select
                  id="zone"
                  className="form-control"
                  value={zone}
                  onChange={handleZoneChange}
                  required
                >
                  <option value="">Select Zone</option>
                  <option value="zone1">Zone 1</option>
                  <option value="zone2">Zone 2</option>
                  <option value="zone3">Zone 3</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="addressDetails">
                  <span className="main-color">* </span>Address Details
                </label>
                <textarea
                  id="addressDetails"
                  className="form-control"
                  placeholder="Enter your address details"
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
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="phoneNumber">
                  <span className="main-color">* </span>Phone Number
                </label>
                <div>
                  <PhoneInput onChange={handlePhoneChange} />
                </div>
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
