"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import "@/app/_css/login.css";

const VerifyPhoneNumber = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // For this example, assume the identifier and type are passed as query parameters.
  const identifier = searchParams.get("identifier") || "";
  const type = searchParams.get("type") || "email"; // or "phone"
  const countryCode = searchParams.get("country_code") || "+20"; // if applicable

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < verificationCode.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      } else if (!value && index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
      }
    }
  };

  useEffect(() => {
    const allFieldsFilled = verificationCode.every((code) => code !== "");
    setIsButtonDisabled(!allFieldsFilled);
  }, [verificationCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = verificationCode.join("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/verify-otp", {
        identifier: identifier,
        type: type,
        country_code: type === "phone" ? countryCode : undefined,
        otp: otpCode,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.reset_token) {
        // Navigate to Reset Password page with query parameters
        router.push(
          `/reset-password?reset_token=${response.data.reset_token}&identifier=${identifier}&type=${type}`
        );
      }
    } catch (error) {
      console.error("OTP verification failed:", error.response?.data || error);
    }
  };

  return (
    <div className="verify-phone-number">
      <div className="container">
        <div className="container-verify-phone-number">
          <div className="verify">
            <span className="close-btn">
              <Link href="/forget-password">
                <IoMdClose />
              </Link>
            </span>
            <h2>Verify {type === "phone" ? "Phone" : "Email"}</h2>
            <p>Code is sent to {identifier}</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                {verificationCode.map((value, index) => (
                  <div className="col-3" key={index}>
                    <input
                      id={`input-${index}`}
                      type="text"
                      className="form-control"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </div>
                ))}
              </div>
              {/* <p>
                Don't receive code?{" "}
                <Link href="#">
                  Send Again
                </Link>
              </p> */}
              <button
                type="submit"
                className="verify-phone-btn"
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
};

export default VerifyPhoneNumber;
