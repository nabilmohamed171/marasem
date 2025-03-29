"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PhoneInput from "@/components/dropFlags/DropFlags";
import { IoMdClose } from "react-icons/io";
import "@/app/_css/login.css";
import axios from "axios";

function ForgetPassword() {
  const [usePhone, setUsePhone] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    country_code: "", // add country_code if needed
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  const toggleEmailPhone = () => {
    setUsePhone((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneNumberInput = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const validateForm = () => {
    if (!usePhone && !formData.email) return false;
    if (usePhone && !formData.phone) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let payload = {};
      if (usePhone) {
        payload = {
          identifier: formData.phone.phone,
          type: "phone",
          country_code: "+20", // ensure this field is provided
        };
      } else {
        payload = {
          identifier: formData.email,
          type: "email",
        };
      }
      console.log("Submitting payload", payload);
      // Build query parameters for the redirect.
      let query = `?identifier=${encodeURIComponent(payload.identifier)}&type=${payload.type}`;
      if (payload.country_code) {
        query += `&country_code=${encodeURIComponent(payload.country_code)}`;
      }
      console.log("going to", `/verify-phone${query}`)
      axios
        .post("http://127.0.0.1:8000/api/send-otp", payload, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          const data = response.data;
          if (data.message) {
            console.log("OTP sent", data);
            router.push(`/verify-phone${query}`);
          } else if (data.error) {
            console.error("Error:", data.error);
          }
        })
        .catch((err) => {
          console.error("Error sending OTP:", err);
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
              Enter Your Phone Number or Email and we'll send you a verification code
            </p>
            <form onSubmit={handleSubmit}>
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
                  {/* Optionally, you can add an input for country code */}
                  {/* <input
                    type="text"
                    name="country_code"
                    placeholder="+20"
                    className="form-control mt-2"
                    value={formData.country_code}
                    onChange={handleChange}
                  /> */}
                </div>
              )}
              <button
                type="submit"
                className="forget-passowrd-btn"
                disabled={isButtonDisabled}
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
