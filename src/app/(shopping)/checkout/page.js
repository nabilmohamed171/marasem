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
  const [user, setUser] = useState("guest");
  const [checkoutData, setCheckoutData] = useState(null);
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [currentAddress, setCurrentAddress] = useState(null);

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

  // Fetch checkout data (cart details, addresses, etc.)
  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://127.0.0.1:8000/api/checkout", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        setCheckoutData(response.data);
        setUser(response.data.user);
        console.log(response.data);
        // if addresses array is not empty, show ShippingAddress; else show AddAddress
        if (response.data.addresses && response.data.addresses.length > 0) {
          const defaultAddr = response.data.addresses.find(addr => addr.is_default);
          setCurrentAddress(defaultAddr || response.data.addresses[0]);
          setShowShippingAddress(true);
          setShowAddAddress(false);
        } else {
          setCurrentAddress(null);
          setShowShippingAddress(false);
          setShowAddAddress(true);
        }
      } catch (error) {
        console.error("Error fetching checkout data:", error);
      }
    };
    fetchCheckoutData();
  }, []);

  const handleSelectAddress = (addressId) => {
    if (checkoutData?.addresses) {
      const addr = checkoutData.addresses.find(a => {
        return a.id == addressId
      });
      if (addr) {
        setCurrentAddress(addr);
        setShowShippingAddress(false);
      }
    }
  };

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

  const handleCloseAlert = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://127.0.0.1:8000/api/checkout", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });
      setCheckoutData(response.data);
      // Close the AddAddress component.
      setShowAddAddress(false);
      if (response.data.addresses && response.data.addresses.length > 0) {
        const defaultAddr = response.data.addresses.find(addr => addr.is_default);
        setCurrentAddress(defaultAddr || response.data.addresses[0]);
      }
    } catch (error) {
      console.error("Error re-fetching checkout data:", error);
    }
  };

  // New function added inside CheckOut component
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const amount =
        checkoutData && checkoutData.total
          ? checkoutData.total -
          checkoutData.discount -
          (isChecked ? Math.min(checkoutData.marasem_credit, checkoutData.total - checkoutData.discount) : 0)
          : 0;
      const payload = {
        address_id: currentAddress ? currentAddress.id : null,
        amount: amount,
        payment_method: selectedPaymentMethod,
        promo_code: "", // include promo code if applicable
        use_marasem_credit: isChecked,
      };
      const response = await axios.post("http://127.0.0.1:8000/api/order", payload, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (response.data.redirect_url) {
        window.location.href = response.data.redirect_url;
      } else {
        window.location.href = "/request-successfully?order_id=" + response.data.order.id;
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
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
                {!currentAddress &&
                  <div className="row">
                    <div className="col-md-12">
                      <div className="address">
                        <button type="button" onClick={handleAddAddress}>
                          + Add Address
                        </button>
                      </div>
                    </div>
                  </div>}
                {currentAddress &&
                  <div className="address-info-checkout">
                    <span className="map-home-mobile d-sm-block d-md-none">
                      <span className="map-home">
                        <FaMapMarkerAlt />
                      </span>
                      {currentAddress?.name || "Address"}
                    </span>
                    <p className="username">{user.first_name} {user.last_name}</p>
                    <p className="full-address">
                      {currentAddress
                        ? `${currentAddress.address}, ${currentAddress.zone}, ${currentAddress.city}`
                        : "No address available"}
                    </p>
                    <p className="phone-number">
                      {checkoutData?.addresses[0]?.country_code || ""}
                      {checkoutData?.addresses[0]?.phone || ""}
                    </p>
                    <span className="check-number-phone-checkout">
                      <FaCheck />
                    </span>
                  </div>}
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
                          disabled={checkoutData ? checkoutData.marasem_credit <= 0 : true}
                        />
                        <label
                          className={`form-check-label ${isChecked ? "text-white" : ""
                            }`}
                          htmlFor="flexCheckDefault"
                        >
                          Pay with Marasem Credit
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 col-6">
                      <div className="balance">
                        <span className="your-balance">
                          Balance &nbsp;
                          <span className="your-balance-number">
                            EGP {checkoutData ? checkoutData.marasem_credit : "0"}
                          </span>
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
                            onChange={() => handleRadioChange("paymob")}
                          />
                          <label
                            className={`form-check-label ${selectedPaymentMethod === "paymob"
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

                  {/* <div className="valu">
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
                            className={`form-check-label ${selectedPaymentMethod === "valu"
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
                  </div> */}

                  <div className="cash">
                    <div className="row">
                      <div className="col-md-6 col-7">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="flexRadioDefault3"
                            defaultChecked
                            onChange={() => handleRadioChange("cash")}
                          />
                          <label
                            className={`form-check-label ${selectedPaymentMethod === "cash"
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
                    <p className="subtotal">
                      Subtotal / {checkoutData ? checkoutData.items_count : 0} items
                    </p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="price-all-items t-r">
                      EGP {checkoutData ? checkoutData.total : 0}
                    </p>
                  </div>
                  {/* <div className="col-md-6 col-6">
                    <p className="promocode">Promocode</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="price-promocode">
                      EGP {checkoutData ? checkoutData.discount : 0}
                    </p>
                  </div> */}
                  {isChecked && <>
                    <div className="col-md-6 col-6">
                      <p className="promocode">Marasem Credit</p>
                    </div>
                    <div className="col-md-6 col-6">
                      <p className="price-promocode">
                        - EGP {checkoutData && isChecked ? Math.min(checkoutData.marasem_credit, checkoutData.total - checkoutData.discount) : 0}
                      </p>
                    </div>
                  </>}
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6 col-6">
                    <p className="total-price">Total Price</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="total-price-number">
                      EGP {checkoutData
                        ? checkoutData.total -
                        checkoutData.discount -
                        (isChecked
                          ? Math.min(checkoutData.marasem_credit, checkoutData.total - checkoutData.discount)
                          : 0)
                        : 0}
                    </p>
                  </div>
                </div>
                <div className="order-summary-button">
                  <Link href="#" onClick={handlePlaceOrder}>Place Order</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      {showShippingAddress && (
        <ShoppingAddress
          addresses={checkoutData?.addresses || []}
          onSelectAddress={handleSelectAddress}
          onAddAddress={handleAddAddress}  // NEW: pass the add address handler
        />
      )
      }
      {showAddAddress && <AddAddress onClose={handleCloseAlert} />}
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default CheckOut;
