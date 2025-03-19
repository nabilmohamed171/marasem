"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import { FaRegCheckCircle } from "react-icons/fa";
import "./request.css";

const RequestSuccessfully = () => {
  const [userType, setUserType] = useState("guest");

  useEffect(() => {
    const fetchUserType = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user-type", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          withCredentials: true,
        });
        setUserType(response.data.user_type);
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, []);
  return (
    <>
      {userType === "artist" ? (
        <Navbar />
      ) : userType === "buyer" ? (
        <Navbar_Buyer />
      ) : (
        <Navbar_Home />
      )}
      <div className="request">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="request-image">
                <FaRegCheckCircle />
              </div>
            </div>
            <div className="col-md-8 col-12">
              <h2>
                Request has been placed
                <span className="main-color"> Successfully</span>
              </h2>
              <p>we will contact you soon</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestSuccessfully;
