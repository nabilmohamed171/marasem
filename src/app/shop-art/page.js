"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import to read query parameters
import axios from "axios";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import AllCards from "@/components/view/AllCards";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import FindMobile from "@/components/filterMobile/FindMobile";
import FilterPc from "@/components/filterPc/FilterPc";

const ShopArt = () => {
  const [userType, setUserType] = useState("guest");
  const searchParams = useSearchParams(); // Hook to read query parameters
  const searchQuery = searchParams.get("q"); // Extract search query from URL

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
      {userType === "artist" ? <Navbar /> : userType === "buyer" ? <Navbar_Buyer /> : <Navbar_Home />}
      <FilterPc />
      <FindMobile />
      <AllCards searchQuery={searchQuery} />
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default ShopArt;