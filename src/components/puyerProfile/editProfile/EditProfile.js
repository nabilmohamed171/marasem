"use client";
import { useState, useEffect } from "react";
import DropFlag from "@/components/dropFlags/DropFlags";
import axios from "axios";
import "./edit-profile.css";

const EditProfile = ({ data }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (data) {
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setCountryCode(data.country_code || "");
    }
  }, [data]);

  const handleReset = () => {
    if (data) {
      const nameParts = data.name ? data.name.split(" ") : [];
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setCountryCode(data.country_code || "");
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        country_code: countryCode,
        phone: phone,
      };
      const response = await axios.put("http://127.0.0.1:8000/api/user/account", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className="section-edit-profile section-edit-profile-pc  d-sm-none d-md-block d-xl-block d-lg-block">
        <form className="form-edit-profile">
          <div className="row">
            <div className="col-4">
              <h2>General Info</h2>
            </div>
            <div className="col-8">
              <div className="button-reset-update">
                <button type="button" className="reset" onClick={handleReset}>
                  Reset
                </button>
                <button type="button" className="update" onClick={handleUpdate}>
                  Save Update
                </button>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="general-info">
                <div className="first-name">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="dropdown-country">
                  <div className="dropdown-flags-create-account">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <DropFlag
                      onChange={(data) => {
                        setCountryCode(data.countryCode);
                        setPhone(data.phone);
                      }}
                      initialCountryCode={countryCode}
                      initialPhone={phone}
                    />
                  </div>
                </div>
                <div className="creat-artist-account">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <p>Creat Artist Account</p>
                    </div>
                    <div className="col-md-6 col-12">
                      <button type="button">I`m an Artist</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="last-name">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="email-address">
                <label htmlFor="emailAddress" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailAddress"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="button" className="change-password">
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="section-edit-profile d-lg-none d-md-none d-xl-none d-sm-block">
        <form className="form-edit-profile">
          <div className="row">
            <div className="col-4">
              <h2>General Info</h2>
            </div>
            <div className="col-8">
              <div className="button-reset-update">
                <button type="button" className="reset" onClick={handleReset}>
                  Reset
                </button>
                <button type="button" className="update" onClick={handleUpdate}>
                  Save Update
                </button>
              </div>
            </div>

            <div className="col-6">
              <div className="first-name">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="last-name">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="dropdown-country">
                <div className="dropdown-flags-create-account">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <DropFlag
                    onChange={(data) => {
                      setCountryCode(data.countryCode);
                      setPhone(data.phone);
                    }}
                    initialCountryCode={countryCode}
                    initialPhone={phone}
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="email-address">
                <label htmlFor="emailAddress" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailAddress"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <button type="button" className="change-password">
                Change Password
              </button>
            </div>
            <div className="col-12">
              <div className="creat-artist-account creat-artist-account-sm">
                <div className="row">
                  <div className="col-6">
                    <p>Creat Artist Account</p>
                  </div>
                  <div className="col-6">
                    <button type="button">I`m an Artist</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
