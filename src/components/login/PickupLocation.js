"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import "@/app/_css/login.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const PickupLocation = () => {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [address, setAddress] = useState("");
  const [cities, setCities] = useState([]);

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

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleZoneChange = (e) => {
    setZone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put("http://127.0.0.1:8000/api/artist/pickup-location", {
        city,
        zone,
        address,
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log(response.data.message);
      router.push("/");
    } catch (error) {
      console.error("Error updating pickup location:", error);
    }
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
                        {cities.map((cityOption, index) => (
                          <option key={index} value={cityOption}>
                            {cityOption}
                          </option>
                        ))}
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
                      <input
                        type="text"
                        id="zone"
                        className="form-control"
                        required
                        placeholder="Enter your zone"
                        value={zone}
                        onChange={handleZoneChange}
                      />
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
