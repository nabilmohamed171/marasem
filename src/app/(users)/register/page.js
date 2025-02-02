"use client";
import React, { useState, useEffect } from "react";
import "@/app/_css/login.css";
import Link from "next/link";
import Image from "next/image";
import DropFlag from "@/components/dropFlags/DropFlags";
import { GoEye } from "react-icons/go";

function CreateAccount() {
  const [isArtist, setIsArtist] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
  });

  const handleSelectType = (type) => {
    setIsArtist(type);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    let formIsValid = true;

    if (!formData.firstname) {
      formErrors.firstname = "First name is required";
      formIsValid = false;
    }

    if (!formData.lastname) {
      formErrors.lastname = "Last name is required";
      formIsValid = false;
    }

    if (!formData.email) {
      formErrors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
      formIsValid = false;
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
      formIsValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
      formIsValid = false;
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid, submitting data...", formData);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    setIsFormValid(isArtist && validateForm());
  }, [formData, isArtist]);

  return (
    <div className="create-account-page">
      <div className="row">
        <div className="col-md-7">
          <div className="create-account-header-image">
            <Image
              width={2000}
              height={2000}
              src="/images/Registration.jpg"
              alt="marasem"
              objectFit="cover"
              quality={100}
              loading="lazy"
            />
          </div>
        </div>
        <div className="col">
          <div className="create-account-form">
            <div className="website-logo scale-hover">
              <img src="/images/main-logo.png" alt="marasem" />
              <span></span>
            </div>

            <form method="POST" onSubmit={handleSubmit}>
              <h2>Create an account</h2>
              <h4>
                Already have an account?{" "}
                <span>
                  <Link href="login">Login</Link>
                </span>
              </h4>

              <div className="select-type">
                <div className="row">
                  <div className="col">
                    <div
                      className={`artist ${
                        isArtist === "artist" ? "active" : ""
                      }`}
                      onClick={() => handleSelectType("artist")}
                    >
                      <h4>I’m an Artist</h4>
                      <p>Register as an artist & sell your own artwork</p>
                    </div>
                  </div>
                  <div className="col">
                    <div
                      className={`lover ${
                        isArtist === "lover" ? "active" : ""
                      }`}
                      onClick={() => handleSelectType("lover")}
                    >
                      <h4>I’m an Art Lover</h4>
                      <p>Register as a buyer</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="enter-username">
                <div className="row section-firstname">
                  <div className="col section-firstname">
                    <label htmlFor="firstname" className="form-label firstname">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      name="firstname"
                      placeholder="First Name"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                    {touchedFields.firstname && errors.firstname && (
                      <span className="error firstname-error">
                        * {errors.firstname}
                      </span>
                    )}
                  </div>
                  <div className="col section-lastname">
                    <label htmlFor="lastname" className="form-label lastname">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      name="lastname"
                      placeholder="Last Name"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                    {touchedFields.lastname && errors.lastname && (
                      <span className="error lastname-error">
                        * {errors.lastname}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="enter-phone">
                <label className="phone" htmlFor="phone">
                  <span className="req">*</span>Phone
                </label>
                <div className="dropdown-country">
                  <div className="dropdown-flags-create-account">
                    <DropFlag onChange={(country) => console.log(country)} />
                  </div>
                </div>
              </div>

              <div className="enter-email" id="email-field">
                <label className="email" htmlFor="email">
                  <span className="req">*</span>Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="email@gmail.com"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
                {touchedFields.email && errors.email && (
                  <span className="error email-error">* {errors.email}</span>
                )}
              </div>

              <div className="enter-password">
                <span className="show-password">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle Password Visibility"
                  >
                    <GoEye
                      className={`fa-regular ${
                        passwordVisible ? "eye-open" : "eye-closed"
                      }`}
                    />
                  </button>
                </span>
                <label className="password" htmlFor="password">
                  <span className="req">*</span>Password
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder="Password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
                {touchedFields.password && errors.password && (
                  <span className="error password-error">
                    * {errors.password}
                  </span>
                )}
              </div>

              <Link href="about-you">
                <button
                  type="submit"
                  className="create-account-btn"
                  disabled={!isFormValid}
                >
                  Create Account
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
