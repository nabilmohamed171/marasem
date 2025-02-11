import React from "react";
import NavbarBuyer from "@/components/all-navbars/NavbarBuyer";
import Artists from "@/components/artists/Artists";
import FindMobile from "@/components/filterMobile/FindMobile";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";

const ShopArtist = () => {
  return (
    <>
      <NavbarBuyer />
      <FindMobile />
      <Artists />
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default ShopArtist;
