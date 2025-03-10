"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PhoneInput from "@/components/dropFlags/DropFlags";
import { GoEye } from "react-icons/go";
import "@/app/_css/login.css";

function CreateAccount() {
  const TEXTS = {
    createAccountHeader: "Create an account",
    alreadyHaveAccount: "Already have an account? ",
    loginLinkText: "Login",
    artistHeader: "I’m an Artist",
    artLoverHeader: "I’m an Art Lover",
    artistDescription: "Register as an artist & sell your own artwork",
    artLoverDescription: "Register as a buyer",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    phoneLabel: "Phone",
    emailLabel: "Email",
    passwordLabel: "Password",
    passwordPlaceholder: "Password",
    createAccountBtn: "Create Account",
  };

  const [isArtist, setIsArtist] = useState("lover");
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

  const handlePhoneNumberInput = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  return (
    <div className="create-account-page">
      <div className="row">
        <div className="col-md-7">
          <div className="create-account-header-image">
            <Image
              width={1500}
              height={1500}
              src="/images/Registration.jpg"
              alt="marasem"
              quality={70}
              priority
            />
          </div>
        </div>
        <div className="col-md-5">
          <div className="create-account-form">
            <div className="website-logo scale-hover">
              <Image
                src="/images/main-logo.png"
                alt="marasem"
                width={180}
                height={35}
                quality={70}
                priority
              />
            </div>

            <form method="POST" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <h2>{TEXTS.createAccountHeader}</h2>
                  <h4>
                    {TEXTS.alreadyHaveAccount}{" "}
                    <span>
                      <Link href="login">{TEXTS.loginLinkText}</Link>
                    </span>
                  </h4>
                </div>
              </div>

              <div className="select-type">
                <div className="row">
                  <div className="col-6">
                    <div
                      className={`lover ${
                        isArtist === "lover" ? "active" : ""
                      }`}
                      onClick={() => handleSelectType("lover")}
                    >
                      <h4>{TEXTS.artLoverHeader}</h4>
                      <p>{TEXTS.artLoverDescription}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      className={`artist ${
                        isArtist === "artist" ? "active" : ""
                      }`}
                      onClick={() => handleSelectType("artist")}
                    >
                      <h4>{TEXTS.artistHeader}</h4>
                      <p>{TEXTS.artistDescription}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="enter-username">
                <div className="row">
                  <div className="col-md-6">
                    <div className="section-firstname">
                      <label
                        htmlFor="firstname"
                        className="form-label firstname"
                      >
                        <span className="req">*</span>
                        {TEXTS.firstNameLabel}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.firstname && touchedFields.firstname
                            ? "border-red"
                            : ""
                        }`}
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
                  </div>
                  <div className="col-md-6">
                    <div className="section-lastname">
                      <label htmlFor="lastname" className="form-label lastname">
                        <span className="req">*</span>
                        {TEXTS.lastNameLabel}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.lastname && touchedFields.lastname
                            ? "border-red"
                            : ""
                        }`}
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
              </div>

              <div className="enter-phone">
                <div className="row">
                  <div className="col-12">
                    <label className="phone" htmlFor="phone">
                      <span className="req">*</span>
                      {TEXTS.phoneLabel}
                    </label>
                    <div className="dropdown-country">
                      <div className="dropdown-flags-create-account">
                        <PhoneInput
                          onChange={handlePhoneNumberInput}
                          value={formData.phone}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="enter-email" id="email-field">
                <div className="row">
                  <div className="col-12">
                    <label className="email" htmlFor="email">
                      <span className="req">*</span>
                      {TEXTS.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="email@gmail.com"
                      className={`form-control ${
                        errors.email && touchedFields.email ? "border-red" : ""
                      }`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {touchedFields.email && errors.email && (
                      <span className="error email-error">
                        * {errors.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="enter-password">
                <div className="row">
                  <div className="col-12">
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
                      <span className="req">*</span>
                      {TEXTS.passwordLabel}
                    </label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      required
                      placeholder={TEXTS.passwordPlaceholder}
                      className={`form-control ${
                        errors.password && touchedFields.password
                          ? "border-red"
                          : ""
                      }`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {touchedFields.password && errors.password && (
                      <span className="error password-error">
                        * {errors.password}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <Link href="about-you">
                    <button
                      type="submit"
                      className="create-account-btn"
                      disabled={!isFormValid}
                    >
                      {TEXTS.createAccountBtn}
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
