"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import "@/app/_css/login.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters from the URL
  const resetToken = searchParams.get("reset_token") || "";
  const identifier = searchParams.get("identifier") || "";
  const type = searchParams.get("type") || "email"; // default to email if not provided

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New Password:", password);

    try {
      const payload = {
        identifier: identifier,
        type: type,
        reset_token: resetToken,
        new_password: password,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/reset-password",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.message) {
        console.log("Password reset successful:", response.data);
        // Redirect to login after successful reset
        router.push("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error.response?.data || error);
    }
  };

  useEffect(() => {
    setIsButtonDisabled(password.trim() === "");
  }, [password]);

  return (
    <div className="reset-passowrd">
      <div className="container">
        <div className="container-reset-password">
          <div className="reset">
            <span className="close-btn">
              <Link href="/login">
                <IoMdClose />
              </Link>
            </span>
            <h2>Reset Your Password</h2>
            <p>Enter your new Password</p>
            <form onSubmit={handleSubmit}>
              <div className="enter-password">
                <span className="show-password">
                  <Link href="#" onClick={togglePasswordVisibility}>
                    <i className="fa-regular fa-eye"></i>
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
              <button
                type="submit"
                className="reset-password-btn"
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

export default ResetPassword;
