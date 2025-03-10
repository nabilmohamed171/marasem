import React from "react";
import NavbarBuyer from "@/components/all-navbars/NavbarBuyer";
import Upper from "@/components/all-navbars/NavbarUpper";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import { IoIosArrowBack } from "react-icons/io";
import "./empty-cart.css";

const EmptyCart = () => {
  return (
    <>
      <Upper />
      <NavbarBuyer />
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
