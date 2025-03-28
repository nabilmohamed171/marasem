"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import SaleArt from "@/components/saleArtwork/SaleArtwork";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";

const ShareArtwork = () => {
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
        console.log("User type fetched:", response.data.user_type);
        if(response.data.user_type !== "artist"){
          window.location.href = "/";
        }
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
      <SaleArt />
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default ShareArtwork;
