"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PhoneInput from "@/components/dropFlags/DropFlags";
import { IoMdClose } from "react-icons/io";
import "@/app/_css/login.css";

function ForgetPassword() {
  const [usePhone, setUsePhone] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const toggleEmailPhone = () => {
    setUsePhone(!usePhone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneNumberInput = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;

    if (!usePhone && !formData.email) {
      formIsValid = false;
    }

    if (usePhone && !formData.phone) {
      formIsValid = false;
    }

    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const phoneNumberWithCountryCode = usePhone
        ? `${countryCode}${formData.phone}`
        : formData.phone;

      console.log("Form is valid, submitting data...", {
        email: formData.email,
        phone: phoneNumberWithCountryCode,
      });
    }
  };

  useEffect(() => {
    if ((usePhone && formData.phone) || (!usePhone && formData.email)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formData, usePhone]);

  return (
    <div className="forget-password">
      <div className="container">
        <div className="container-forget-password">
          <div className="forget">
            <span className="close-btn">
              <Link href="/login">
                <IoMdClose />
              </Link>
            </span>

            <h2>Forget Password?</h2>
            <p>
              Enter Your Phone Number or Email and we'll send you a link to
              reset your password
            </p>

            <form method="POST" onSubmit={handleSubmit}>
              {!usePhone ? (
                <div className="enter-email" id="email-field">
                  <span className="user-phone">
                    <Link href="#" onClick={toggleEmailPhone}>
                      Use Phone Number?
                    </Link>
                  </span>
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
                </div>
              ) : (
                <div className="enter-phone" id="phone-field">
                  <span className="user-email">
                    <Link href="#" onClick={toggleEmailPhone}>
                      Use Email?
                    </Link>
                  </span>
                  <label className="phone" htmlFor="phone">
                    <span className="req">*</span>Phone Number
                  </label>

                  <PhoneInput
                    onChange={handlePhoneNumberInput}
                    value={formData.phone}
                  />
                </div>
              )}
              <Link href="verify-phone">
                <button
                  type="submit"
                  className="forget-passowrd-btn"
                  disabled={isButtonDisabled}
                >
                  Reset Password
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
