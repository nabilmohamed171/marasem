"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import "@/app/_css/login.css";

const VerifyPhoneNumber = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Verification Code:", verificationCode.join(""));
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
            <h2>Verify Phone</h2>
            <p>Code is sent to {""}</p>

            <form method="POST" id="verification-form" onSubmit={handleSubmit}>
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
              <p>
                Don't Receive Code?{" "}
                <Link className="req" href="#">
                  Send Again
                </Link>
              </p>
              <Link href="reset-password">
                <button
                  type="submit"
                  className="verify-phone-btn"
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
};

export default VerifyPhoneNumber;
