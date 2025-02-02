"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import "@/app/_css/login.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password:", password);
  };

  useEffect(() => {
    if (password.trim() === "") {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [password]);

  return (
    <div className="reset-passowrd">
      <div className="container">
        <div className="container-reset-password">
          <div className="reset">
            <span className="close-btn">
              <Link href="verify-phone">
                <IoMdClose />
              </Link>
            </span>
            <h2>Reset Your Password</h2>
            <p>Enter your new Password</p>

            <form onSubmit={handleSubmit}>
              <div className="enter-password">
                <span className="show-password">
                  <Link href="#" onClick={togglePasswordVisibility}>
                    <i
                      className={`fa-regular ${
                        isPasswordVisible ? "fa-eye" : "fa-eye"
                      }`}
                    ></i>
                  </Link>
                </span>
                <label className="password" htmlFor="password">
                  <span className="req">*</span>Password
                </label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <Link href="#">
                <button
                  type="submit"
                  className="reset-password-btn"
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

export default ResetPassword;
