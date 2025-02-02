"use client";
import React, { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import "@/app/_css/login.css";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = () => {
    if (emailOrPhone !== "" && password !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    handleInputChange();
  }, [emailOrPhone, password]);

  return (
    <div className="login-page">
      <div className="row">
        <div className="col-md-7">
          <div className="login-header-image">
            <Image
              width={2000}
              height={2000}
              quality={100}
              loading="lazy"
              objectFit="cover"
              src="/images/Login.jpg"
              alt="marasem"
            />
          </div>
        </div>
        <div className="col">
          <div className="login-form">
            <div className="website-logo scale-hover">
              <img src="/images/main-logo.png" alt="Marasem Logo" />
            </div>
            <form method="POST" onSubmit={handleSubmit}>
              <h2>Login</h2>
              <h4>
                Don’t have an account?{" "}
                <span>
                  <a href="/register">Create an account</a>
                </span>
              </h4>

              <div className="enter-email" id="email-field">
                <label className="email-or-phone" htmlFor="emailOrPhone">
                  <span className="req">*</span>Email or Phone
                </label>
                <input
                  type="text"
                  id="emailOrPhone"
                  name="emailOrPhone"
                  required
                  placeholder="Enter your email or phone"
                  className="form-control"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                />
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
                        isPasswordVisible ? "eye-open" : "eye-closed"
                      }`}
                    />
                  </button>
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
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <span className="forget-password">
                <Link href="forget-password">
                  <button type="button">Forget Password?</button>
                </Link>
              </span>

              <button
                type="submit"
                className="login-btn"
                disabled={!isFormValid}
              >
                Login
              </button>

              <div className="social-login">
                <span>Or Login with social</span>
                <Link className="google" href="#">
                  <FaGoogle />
                </Link>
                <Link className="facebook" href="#">
                  <FaFacebookF />
                </Link>
                <Link className="behance" href="#">
                  <FaBehance />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
