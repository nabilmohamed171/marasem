"use client";
import Upper from "@/components/all-navbars/NavbarUpper";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import MainCover from "@/components/header/MainCover";
import MobileCover from "@/components/header/MobileCover";
import FindMobile from "@/components/filterMobile/FindMobile";
import FilterPc from "@/components/filterPc/FilterPc";

const HeaderHome = () => {
  return (
    <>
      <Upper />
      <Navbar_Home />
      <MainCover />
      <MobileCover />
      <FilterPc />
      <FindMobile />
    </>
  );
};

export default HeaderHome;
