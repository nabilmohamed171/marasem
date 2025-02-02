import React from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { PiInvoiceLight } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import "./order-details.css";

const OrderDetails = () => {
  return (
    <div className="container">
      <div className="order-details">
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="main-order">
              <div className="order-number-items">
                <div className="row">
                  <div className="col-8">
                    <p className="order-number">Order MARASEM237417894V.</p>
                    <p className="order-date">Placed on Dec 2, 2022</p>
                  </div>
                  <div className="col-4">
                    <p className="pending">PENDING</p>
                    <p className="item-number">3 Items</p>
                  </div>
                  <div className="col-12">
                    <Link className="reser-link" href="/request-successfully">
                      <span className="icon-invoice">
                        <PiInvoiceLight />
                      </span>
                      Order Invoice
                    </Link>
                  </div>
                </div>
              </div>
              <div className="shipping-address">
                <h2>Shipping Address</h2>
                <div className="address-info">
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
                  <span className="check-number-phone">
                    <FaCheck />
                  </span>
                </div>
              </div>
              <div className="payment-method">
                <h2>Payment Method</h2>
                <div className="row">
                  <div className="col-md-12">
                    <div className="address">
                      <button type="button" className="credit-card">
                        <span className="icon-credit">
                          <BsCreditCard2Back />
                        </span>
                        Credit Card
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shipment first-shipment">
                <div className="item">
                  <div className="row">
                    <div className="col-6 shipment-upper">
                      <span className="shipment-number">Shipment 1</span>
                    </div>
                    <div className="col-6">
                      <span className="delevired">DELEVIRED</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2 col-3">
                      <div className="image-item">
                        <Image
                          src="/images/55.png"
                          alt="Artwork Image"
                          width={150}
                          height={150}
                          loading="lazy"
                          quality={100}
                        />
                      </div>
                    </div>
                    <div className="col-md-10 col-9">
                      <div className="info-item">
                        <h2>Art Work Name,Type,Calligraphy</h2>
                        <p>
                          Omar Mohsen, Calligraphy , 2021, 48/58 Ink on Paper
                          7.87 x 11.41 x 1.37 Inches 20 x 29 x 3.5 cm
                        </p>
                        <span>EGP 2,079.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shipment last-shipment">
                <div className="item">
                  <div className="row">
                    <div className="col-6 shipment-upper">
                      <span className="shipment-number">Shipment 2</span>
                    </div>
                    <div className="col-6">
                      <span className="delevired color-f">PENDING</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2 col-3">
                      <div className="image-item">
                        <Image
                          src="/images/22.png"
                          alt="Artwork Image"
                          width={150}
                          height={150}
                          loading="lazy"
                          quality={100}
                        />
                      </div>
                    </div>
                    <div className="col-md-10 col-9">
                      <div className="info-item">
                        <h2>Art Work Name,Type, Calligraphy</h2>
                        <p>
                          Omar Mohsen, Calligraphy , 2021, 48/58 Ink on Paper
                          7.87 x 11.41 x 1.37 Inches 20 x 29 x 3.5 cm
                        </p>
                        <span>EGP 2,079.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-summary-mobile">
                <div className="row">
                  <div className="col-6">
                    <p className="subtotal">Subtotal / 3 items</p>
                  </div>
                  <div className="col-6">
                    <p className="price-all-items t-r color-g">EGP 3,738.00</p>
                  </div>
                  <div className="col-6">
                    <p className="promocode">
                      Shipping <span className="color-m">Details</span>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="price-promocode color-g">EGP 37.00</p>
                  </div>
                  <div className="col-6">
                    <p className="promocode">Marasem Credit</p>
                  </div>
                  <div className="col-6">
                    <p className="price-promocode main-color">- EGP 37.00</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-6">
                    <p className="total-price">Total Price</p>
                  </div>
                  <div className="col-6">
                    <p className="total-price-number color-f">EGP 3,777.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
