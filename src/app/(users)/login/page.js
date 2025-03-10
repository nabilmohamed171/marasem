"use client";
import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaGoogle,
  FaBehance,
  FaRegEyeSlash,
} from "react-icons/fa";
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

  const LOGIN_HEADER = "Login";
  const CREATE_ACCOUNT_TEXT = "Don’t have an account? ";
  const CREATE_ACCOUNT_LINK_TEXT = "Create an account";
  const EMAIL_OR_PHONE_LABEL = "Email or Phone";
  const PASSWORD_LABEL = "Password";
  const FORGOT_PASSWORD_TEXT = "Forget Password?";
  const SOCIAL_LOGIN_TEXT = "Or Login with social";
  const LOGIN_BTN_TEXT = "Login";

  const EMAIL_PLACEHOLDER = "Enter your email or phone";
  const PASSWORD_PLACEHOLDER = "Password";

  return (
    <div className="login-page">
      <div className="row">
        <div className="col-md-7">
          <div className="login-header-image">
            <Image
              width={1500}
              height={1500}
              quality={70}
              priority
              src="/images/Login.jpg"
              alt="marasem"
            />
          </div>
        </div>
        <div className="col">
          <div className="login-form">
            <div className="website-logo scale-hover">
              <Image
                src="/images/main-logo.png"
                alt="Marasem Logo"
                width={180}
                height={35}
                quality={70}
                priority
              />
            </div>
            <form method="POST" onSubmit={handleSubmit}>
              <h2>{LOGIN_HEADER}</h2>
              <h4>
                {CREATE_ACCOUNT_TEXT}{" "}
                <span>
                  <a href="/register">{CREATE_ACCOUNT_LINK_TEXT}</a>
                </span>
              </h4>

              <div className="enter-email" id="email-field">
                <label className="email-or-phone" htmlFor="emailOrPhone">
                  <span className="req">*</span>
                  {EMAIL_OR_PHONE_LABEL}
                </label>
                <input
                  type="text"
                  id="emailOrPhone"
                  name="emailOrPhone"
                  required
                  placeholder={EMAIL_PLACEHOLDER}
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
                    style={{ color: "red" }}
                  >
                    {isPasswordVisible ? (
                      <GoEye
                        className="eye-icon"
                        style={{ color: "#F3AE4D" }}
                      />
                    ) : (
                      <FaRegEyeSlash
                        className="eye-icon"
                        style={{ color: "#F3AE4D" }}
                      />
                    )}
                  </button>
                </span>
                <label className="password" htmlFor="password">
                  <span className="req">*</span>
                  {PASSWORD_LABEL}
                </label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder={PASSWORD_PLACEHOLDER}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <span className="forget-password">
                <Link href="/forget-password">
                  <button type="button">{FORGOT_PASSWORD_TEXT}</button>
                </Link>
              </span>

              <button
                type="submit"
                className="login-btn"
                disabled={!isFormValid}
              >
                {LOGIN_BTN_TEXT}
              </button>

              <div className="social-login">
                <span>{SOCIAL_LOGIN_TEXT}</span>
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
