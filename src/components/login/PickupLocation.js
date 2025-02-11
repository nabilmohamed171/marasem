"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import "@/app/_css/login.css";

const PickupLocation = () => {
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [address, setAddress] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleZoneChange = (e) => {
    setZone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("City:", city);
    console.log("Zone:", zone);
    console.log("Address:", address);
  };

  return (
    <div className="pickup-location">
      <div className="container">
        <div className="container-pickup-location">
          <div className="location">
            <span className="close-btn">
              <Link href="my-wishes">
                <IoMdClose />
              </Link>
            </span>

            <form onSubmit={handleSubmit}>
              <div className="add-user-location">
                <div className="row">
                  <h2>Pickup Location</h2>
                  <p>Allow Marasem to Access your Location</p>
                  <div className="col-6">
                    <div className="city">
                      <label htmlFor="city" className="form-label">
                        <span className="req">*</span>City
                      </label>
                      <select
                        id="city"
                        className="form-select"
                        required
                        value={city}
                        onChange={handleCityChange}
                      >
                        <option value="" disabled>
                          Select your city
                        </option>
                        <option value="Cairo">Cairo</option>
                        <option value="Alexandria">Alexandria</option>
                        <option value="Giza">Giza</option>
                        <option value="Sharm El Sheikh">Sharm El Sheikh</option>
                      </select>
                      <span className="arrow-down-icon">
                        <IoIosArrowDown />
                      </span>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="zone">
                      <label htmlFor="zone" className="form-label">
                        <span className="req">*</span>Zone
                      </label>
                      <select
                        id="zone"
                        className="form-select"
                        required
                        value={zone}
                        onChange={handleZoneChange}
                      >
                        <option value="" disabled>
                          Select your zone
                        </option>
                        <option value="Downtown">Downtown</option>
                        <option value="Zamalek">Zamalek</option>
                        <option value="Maadi">Maadi</option>
                        <option value="Haram">Haram</option>
                      </select>
                      <span className="arrow-down-icon">
                        <IoIosArrowDown />
                      </span>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="address-details">
                      <label htmlFor="address" className="form-label">
                        <span className="req">*</span>Address Details
                      </label>
                      <textarea
                        id="address"
                        className="form-control"
                        rows="1"
                        required
                        placeholder="Enter your full address here"
                        value={address}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="location-btn">
                      Save Address
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupLocation;
