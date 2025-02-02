"use client";
import Upper from "../navbar/Upper";
import MainCover from "@/components/header/MainCover";
import FindMobile from "../filterMobile/FindMobile";
import MobileCover from "./MobileCover";
import Navbar_Home from "../navbar/Navbar_Home";
import FilterPc from "../filterPc/FilterPc";

const HeaderHome = () => {
  return (
    <>
      <Upper />
      <Navbar_Home />
      <MainCover />
      <FilterPc />
      <MobileCover />
      <FindMobile />
    </>
  );
};

export default HeaderHome;
