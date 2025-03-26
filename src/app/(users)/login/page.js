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
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import "@/app/_css/login.css";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      router.push("/");
    }
  }, [searchParams, router]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    setIsFormValid(emailOrPhone !== "" && password !== "");
  }, [emailOrPhone, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: emailOrPhone,
        password: password,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // Save token and user info
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        console.log("Login successful:", response.data);

        router.push("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(
        error.response?.data?.message || "Invalid credentials. Please try again."
      );
    }
  };

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
              <h2>Login</h2>
              <h4>
                Don’t have an account?{" "}
                <span>
                  <Link href="/register">Create an account</Link>
                </span>
              </h4>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="enter-email">
                <label htmlFor="emailOrPhone">
                  <span className="req">*</span> Email or Phone
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
                    style={{ color: "red" }}
                  >
                    {isPasswordVisible ? (
                      <GoEye className="eye-icon" style={{ color: "#F3AE4D" }} />
                    ) : (
                      <FaRegEyeSlash
                        className="eye-icon"
                        style={{ color: "#F3AE4D" }}
                      />
                    )}
                  </button>
                </span>
                <label htmlFor="password">
                  <span className="req">*</span> Password
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
                <Link href="/forget-password">
                  <button type="button">Forget Password?</button>
                </Link>
              </span>

              <button type="submit" className="login-btn" disabled={!isFormValid}>
                Login
              </button>

              <div className="social-login">
                <span>Or Login with social</span>
                <a className="google" href="http://127.0.0.1:8000/login/google/redirect">
                  <FaGoogle />
                </a>
                <a className="facebook" href="http://127.0.0.1:8000/login/facebook/redirect">
                  <FaFacebookF />
                </a>
                <a className="behance" href="http://127.0.0.1:8000/login/behance/redirect">
                  <FaBehance />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
