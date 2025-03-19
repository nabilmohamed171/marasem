"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import { RiArrowLeftSLine } from "react-icons/ri";
import Upper from "@/components/all-navbars/NavbarUpper";
import Navbar_Home from "@/components/all-navbars/NavbarHome";
import Navbar_Buyer from "@/components/all-navbars/NavbarBuyer";
import Navbar from "@/components/all-navbars/NavbarArtists";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import ShoppingAddress from "@/components/addressCart/shippingAddress/ShippingAddress";
import AddAddress from "@/components/addressCart/addAddress/AddAddress";
import Link from "next/link";
import Image from "next/image";
import "./checkout.css";

const CheckOut = () => {
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
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handleChangeAddress = () => {
    setShowShippingAddress((prevState) => !prevState);
  };

  const handleAddAddress = () => {
    setShowAddAddress((prevState) => !prevState);
  };

  const handleRadioChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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
        <div className="checkout-items">
          <div className="item-number">
            <Link className="reser-link" href="/cart">
              <span>
                <RiArrowLeftSLine />
              </span>
              <span>CHECKOUT</span>
            </Link>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="shipping-address">
                <h2>Shipping Address</h2>
                <button
                  className="change-address"
                  onClick={handleChangeAddress}
                >
                  Change
                </button>
                <div className="row">
                  <div className="col-md-12">
                    <div className="address">
                      <button type="button" onClick={handleAddAddress}>
                        + Add Address
                      </button>
                    </div>
                  </div>
                </div>
                <div className="address-info-checkout">
                  <span className="map-home-mobile d-sm-block d-md-none">
                    <span className="map-home">
                      <FaMapMarkerAlt />
                    </span>
                    Home
                  </span>
                  <p className="username">Omar Mohsen</p>
                  <p className="full-address">
                    Apartment 10, flat 5, building 8, 373R+M8 - Sarayat El-maadi
                    - Cairo Governorate, Egypt
                  </p>
                  <p className="phone-number">+20-10-12424029</p>
                  <span className="check-number-phone-checkout">
                    <FaCheck />
                  </span>
                </div>
              </div>
              <div className="your-marasem-credit">
                <h2>Your Marasem Credit</h2>
                <div className="credit">
                  <div className="row">
                    <div className="col-md-6 col-6">
                      <div className="form-check">
                        <input
                          className="form-check-input balance-credit"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className={`form-check-label ${
                            isChecked ? "text-white" : ""
                          }`}
                          htmlFor="flexCheckDefault"
                        >
                          Pay with Etmana Credit
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 col-6">
                      <div className="balance">
                        <span className="your-balance">
                          Balance
                          <span className="your-balance-number"> EGP 350</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="payment-method">
                <h2>Payment Method</h2>
                <div className="payment">
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6 col-7">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="flexRadioDefault1"
                            onChange={() => handleRadioChange("card")}
                          />
                          <label
                            className={`form-check-label ${
                              selectedPaymentMethod === "card"
                                ? "text-white"
                                : ""
                            }`}
                            htmlFor="flexRadioDefault1"
                          >
                            Debit/Credit Card
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 col-5">
                        <span className="payment-right">
                          <Image
                            src="/images/visa.png"
                            alt="Visa logo"
                            width={45}
                            height={30}
                            quality={70}
                            loading="lazy"
                          />
                        </span>
                        <span className="payment-right">
                          <Image
                            src="/images/card.png"
                            alt="Card logo"
                            width={45}
                            height={30}
                            quality={70}
                            loading="lazy"
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="valu">
                    <div className="row">
                      <div className="col-md-6 col-7">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="flexRadioDefault2"
                            defaultChecked
                            onChange={() => handleRadioChange("valu")}
                          />
                          <label
                            className={`form-check-label ${
                              selectedPaymentMethod === "valu"
                                ? "text-white"
                                : ""
                            }`}
                            htmlFor="flexRadioDefault2"
                          >
                            Pay with ValU
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 col-5">
                        <span className="payment-right">
                          <Image
                            src="/images/valu.png"
                            alt="ValU logo"
                            width={45}
                            height={30}
                            quality={70}
                            loading="lazy"
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="cash">
                    <div className="row">
                      <div className="col-md-6 col-7">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="flexRadioDefault3"
                            onChange={() => handleRadioChange("cash")}
                          />
                          <label
                            className={`form-check-label ${
                              selectedPaymentMethod === "cash"
                                ? "text-white"
                                : ""
                            }`}
                            htmlFor="flexRadioDefault3"
                          >
                            Cash On Delivery
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 col-5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <p className="subtotal">Subtotal / 5 items</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="price-all-items t-r">EGP 3,738.00</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="promocode">Promocode</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="price-promocode">EGP 37.00</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6 col-6">
                    <p className="total-price">Total Price</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="total-price-number">EGP 3,777.00</p>
                  </div>
                </div>
                <div className="order-summary-button">
                  <Link href="/order-details">Placed Order</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showShippingAddress && <ShoppingAddress />}
      {showAddAddress && <AddAddress />}
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default CheckOut;
