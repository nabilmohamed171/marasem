"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import Upper from "@/components/all-navbars/NavbarUpper";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import { IoIosArrowBack } from "react-icons/io";
import "./empty-cart.css";

const EmptyCart = () => {
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
      <Upper />
      {userType === "artist" ? (
        <Navbar />
      ) : userType === "buyer" ? (
        <Navbar_Buyer />
      ) : (
        <Navbar_Home />
      )}
      <div className="container">
        <div className="prev-cart">
          <IoIosArrowBack />
          <span>Cart</span>
        </div>
      </div>

      <div className="empty-cart text-center">
        <h1>Empty cart</h1>
        <p>
          You don’t have any Artwork in your cart, you can start searching now!
        </p>
        <button type="button">+ Add Artwork</button>
      </div>
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default EmptyCart;
