"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Upper from "@/components/all-navbars/NavbarUpper";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import MainCover from "@/components/header/MainCover";
import MobileCover from "@/components/header/MobileCover";
import FindMobile from "@/components/filterMobile/FindMobile";
import FilterPc from "@/components/filterPc/FilterPc";

const HeaderHome = () => {
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
      <MainCover />
      <MobileCover />
      <FilterPc />
      <FindMobile />
    </>
  );
};

export default HeaderHome;
