"use client";
import React from "react";
import NavbarArtists from "@/components/all-navbars/NavbarArtists";
import { SliderCategory } from "@/components/slider/Slider";
import AllCards from "@/components/view/AllCards";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import FindMobile from "@/components/filterMobile/FindMobile";
import FilterPcFixed from "@/components/filterPc/FilterPcFixed";

const ShopArt = () => {
  return (
    <>
      <NavbarArtists />
      <FilterPcFixed />
      <FindMobile />
      <SliderCategory />
      <AllCards />
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default ShopArt;
