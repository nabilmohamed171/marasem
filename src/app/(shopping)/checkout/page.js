"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import { RiArrowLeftSLine } from "react-icons/ri";
import Upper from "@/components/navbar/Upper";
import NabvarBuyer from "@/components/navbar/NavbarArtists";
import Footer from "@/components/footer/Footer";
import FooterAccordion from "@/components/footer/FooterAccordion";
import ShoppingAddress from "@/components/addressCart/shippingAddress/ShippingAddress";
import AddAddress from "@/components/addressCart/addAddress/AddAddress";
import Link from "next/link";
import Image from "next/image";
import "./checkout.css";

const CheckOut = () => {
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(true);

  const handleChangeAddress = () => {
    setShowShippingAddress((prevState) => !prevState);
  };

  const handleAddAddress = () => {
    setShowAddAddress((prevState) => !prevState);
  };

  return (
    <>
      <Upper />
      <NabvarBuyer />
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
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Pay with Etmana Credit
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 col-6 balance">
                      <span className="your-balance">
                        Your Balance
                        <span className="your-balance-number"> EGP 350</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="payment-method">
                <h2>Payment Method</h2>
                <div className="payment">
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="flexRadioDefault1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            Debit/Credit Card
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 col-6">
                        <span className="payment-right">
                          <Image
                            src="/images/visa.png"
                            alt="Visa logo"
                            width={70}
                            height={40}
                            quality={100}
                          />
                        </span>
                        <span className="payment-right">
                          <Image
                            src="/images/card.png"
                            alt="Card logo"
                            width={50}
                            height={35}
                            quality={100}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="valu">
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="flexRadioDefault2"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Pay with ValU
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 col-6">
                        <span className="payment-right">
                          <Image
                            src="/images/valu.png"
                            alt="ValU logo"
                            width={90}
                            height={40}
                            quality={100}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="cash">
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="flexRadioDefault3"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault3"
                          >
                            Cash On Delivery
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 col-6"></div>
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
                  <Link href="/order-details">Order Placed</Link>
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
