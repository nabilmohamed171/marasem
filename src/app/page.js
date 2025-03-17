// "use client";
import FirstCollections from "@/components/collections/FisrtCollection";
import SecCollections from "@/components/collections/SecondCollection";
import ThreeCollections from "@/components/collections/ThreeCollection";
import HeaderHome from "@/components/header/Header";
import OriginalArtwork from "@/components/header/OriginalArtwork";
import MostReview from "@/components/view/Mostview";
import NewArtwork from "@/components/view/NewArtwork";
import { SliderCategory } from "@/components/slider/Slider";
import AllCards from "@/components/view/AllCards";
import Pagination from "@/components/paginations/Pagination";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
// import { useState } from "react";

const Home = () => {
  return (
    <>
      <HeaderHome />
      <SliderCategory />
      <FirstCollections />
      <MostReview />
      <SecCollections />
      <NewArtwork />
      <ThreeCollections />
      <OriginalArtwork />
      <AllCards />
      <Pagination />
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default Home;
